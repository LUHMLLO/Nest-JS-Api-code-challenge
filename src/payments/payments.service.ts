import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentsEntity } from './payments.entity'
import { LoansEntity } from 'src/loans/loans.entity';
import { PaymentFrequencies } from 'src/utils.enums';

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

    async create(dto: any): Promise<PaymentsEntity | string> {
        const target = await this.loansRepo.findOne({ where: { id: dto.loanID } })

        if (target == null) {
            return JSON.stringify('loan not found')
        }

        if (dto.term_frequency in PaymentFrequencies) {
            const payment = new PaymentsEntity()

            payment.loan = target

            payment.requested_amount = dto.requested_amount
            payment.interest_rate = dto.interest_rate
            payment.term_duration = dto.term_duration
            payment.term_frequency = dto.term_frequency

            payment.total_interest = Math.round((payment.requested_amount * payment.interest_rate) * 100) / 100
            payment.total_payment = Math.round((payment.requested_amount + payment.total_interest) * 100) / 100
            payment.monthly_interest = Math.round((payment.total_interest / payment.term_duration) * 100) / 100
            payment.monthly_payment = Math.round((payment.requested_amount / payment.term_duration) * 100) / 100

            payment.approval_status = false

            payment.payments_fullfilled = 0
            payment.payments_pending = payment.term_duration
            payment.current_balance = payment.requested_amount

            payment.created = new Date()
            //payment.modified = new Date(0)

            return this.paymentsRepo.save(payment)
        } else {
            return JSON.stringify('invalid payment frequency')
        }
    }

    async approve(id: number): Promise<PaymentsEntity | string> {
        const target = await this.paymentsRepo.findOne({ where: { id: id } })

        if (target == null) {
            return JSON.stringify('payment not found')
        } else {
            target.approval_status = true
            target.modified = new Date()

            await this.paymentsRepo.update(id, target)

            return target
        }
    }

    async read(id: number): Promise<PaymentsEntity | null> {
        return this.paymentsRepo.findOneBy({ id })
    }

    async update(id: number, entity: PaymentsEntity): Promise<PaymentsEntity | string> {
        const target = await this.paymentsRepo.findOne({ where: { id: id } })

        if (target == null) {
            return JSON.stringify('loan not found')
        } else {
            entity.modified = new Date()

            await this.paymentsRepo.update(id, entity)

            return entity
        }
    }

    async delete(id: number): Promise<void> {
        await this.paymentsRepo.delete(id);
    }
}
