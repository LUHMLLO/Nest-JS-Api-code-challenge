import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoansEntity } from './loans.entity'
import { ClientsEntity } from 'src/clients/clients.entity';
import { PaymentFrequencies } from 'src/utils.enums';
import { CreateLoansDTO, LoansDTO } from './loans.dto';

@Injectable()
export class LoansService {
    constructor(
        @InjectRepository(LoansEntity)
        private readonly loansRepo: Repository<LoansEntity>,

        @InjectRepository(ClientsEntity)
        private readonly clientsRepo: Repository<ClientsEntity>,
    ) { }

    async all(): Promise<LoansEntity[]> {
        return this.loansRepo.find()
    }

    async allLoansPayments(): Promise<LoansEntity[]> {
        return this.loansRepo.find({
            relations: ['payments']
        })
    }

    async create(dto: CreateLoansDTO): Promise<LoansEntity | string> {
        const target = await this.clientsRepo.findOne({ where: { id: dto.clientID } })

        if (!target) {
            return JSON.stringify('client not found')
        }

        const loan = new LoansEntity()

        loan.client = target

        loan.requested_amount = dto.requested_amount
        loan.interest_rate = dto.interest_rate
        loan.term_duration = dto.term_duration
        loan.term_frequency = dto.term_frequency

        loan.total_interest = Math.round((dto.requested_amount * dto.interest_rate) * 100) / 100
        loan.total_loan = Math.round((dto.requested_amount + loan.total_interest) * 100) / 100
        loan.monthly_interest = Math.round((loan.total_interest / dto.term_duration) * 100) / 100
        loan.monthly_payment = Math.round((dto.requested_amount / dto.term_duration) * 100) / 100
        loan.monthly_fee = Math.round(loan.monthly_interest + loan.monthly_payment)

        loan.approval = false
        loan.current_balance = loan.total_loan

        loan.created = new Date()

        this.loansRepo.save(loan)

        target.modified = new Date()
        this.clientsRepo.update(target.id, target)

        return loan
    }

    async approve(id: number): Promise<LoansEntity | string> {
        const target = await this.loansRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('loan not found')
        } else {
            target.approval = true
            target.modified = new Date()

            await this.loansRepo.update(id, target)

            return target
        }
    }

    async read(id: number): Promise<LoansEntity | string> {
        const target = await this.loansRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('loan not found')
        }

        return target
    }

    async update(id: number, dto: LoansDTO): Promise<string> {
        const target = await this.loansRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('loan not found')
        }

        dto.modified = new Date()

        await this.loansRepo.update(id, dto)

        return 'loan updated'
    }

    async delete(id: number): Promise<string> {
        const target = await this.loansRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('loan not found')
        }

        await this.loansRepo.delete(id);

        return JSON.stringify(`loan '#${target.id}' deleted`)
    }
}
