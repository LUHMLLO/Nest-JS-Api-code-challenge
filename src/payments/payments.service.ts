import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentsEntity } from './payments.entity'
import { LoansEntity } from 'src/loans/loans.entity';
import { PaymentFrequencies } from 'src/utils.enums';
import { CreatePaymentsDTO, PaymentsDTO } from './payments.dto';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(PaymentsEntity)
        private readonly paymentsRepo: Repository<PaymentsEntity>,

        @InjectRepository(LoansEntity)
        private readonly loansRepo: Repository<LoansEntity>,
    ) { }

    async all(): Promise<PaymentsEntity[]> {
        return this.paymentsRepo.find()
    }

    async create(dto: CreatePaymentsDTO): Promise<PaymentsEntity | string> {
        const target = await this.loansRepo.findOne({ where: { id: dto.loanID } })

        if (!target) {
            return JSON.stringify('loan not found')
        }

        if(target.current_balance == 0){
            return JSON.stringify('loan already paid off')
        }

        const payment = new PaymentsEntity()

        payment.loan = target

        payment.initial_balance = target.current_balance
        payment.issued_payment = dto.payment
        payment.final_balance = Math.round(target.current_balance - dto.payment)

        payment.created = new Date()

        this.paymentsRepo.save(payment)

        target.current_balance = payment.final_balance
        target.modified = new Date()

        this.loansRepo.update(target.id, target)

        return payment
    }

    async read(id: number): Promise<PaymentsEntity | null> {
        return this.paymentsRepo.findOneBy({ id })
    }

    async readLoanBalance(id: number): Promise<LoansEntity[] | null> {
        return this.loansRepo.find({
            relations: ['payments']
        })
        //return this.loansRepo.query(`select * from prestamos where (id = ${id} AND approval = true)`)
    }

    async update(id: number, dto: PaymentsDTO): Promise<PaymentsEntity | string> {
        const target = await this.paymentsRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('loan not found')
        }

        dto.modified = new Date()

        await this.paymentsRepo.update(id, dto)

        return dto
    }

    async delete(id: number): Promise<void> {
        await this.paymentsRepo.delete(id);
    }
}
