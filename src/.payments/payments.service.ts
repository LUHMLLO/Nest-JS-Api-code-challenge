import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoansEntity } from './payments.entity'
import { ClientsEntity } from 'src/clients/clients.entity';
import { PaymentFrequencies } from 'src/utils.enums';

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

    async create(dto: any): Promise<LoansEntity | string> {
        const target = await this.clientsRepo.findOne({ where: { id: dto.clientID } })

        if (target == null) {
            return JSON.stringify('client not found')
        }

        if (dto.term_frequency in PaymentFrequencies) {
            const loan = new LoansEntity()

            loan.client = target

            loan.requested_amount = dto.requested_amount
            loan.interest_rate = dto.interest_rate
            loan.term_duration = dto.term_duration
            loan.term_frequency = dto.term_frequency

            loan.total_interest = Math.round((loan.requested_amount * loan.interest_rate) * 100) / 100
            loan.total_loan = Math.round((loan.requested_amount + loan.total_interest) * 100) / 100
            loan.monthly_interest = Math.round((loan.total_interest / loan.term_duration) * 100) / 100
            loan.monthly_payment = Math.round((loan.requested_amount / loan.term_duration) * 100) / 100

            loan.approval_status = false

            loan.payments_fullfilled = 0
            loan.payments_pending = loan.term_duration
            loan.current_balance = loan.requested_amount

            loan.created = new Date()
            //loan.modified = new Date(0)

            return this.loansRepo.save(loan)
        } else {
            return JSON.stringify('invalid payment frequency')
        }
    }

    async approve(id: number): Promise<LoansEntity | string> {
        const target = await this.loansRepo.findOne({ where: { id: id } })

        if (target == null) {
            return JSON.stringify('loan not found')
        } else {
            target.approval_status = true
            target.modified = new Date()

            await this.loansRepo.update(id, target)

            return target
        }
    }

    async read(id: number): Promise<LoansEntity | null> {
        return this.loansRepo.findOneBy({ id })
    }

    async update(id: number, entity: LoansEntity): Promise<LoansEntity | string> {
        const target = await this.loansRepo.findOne({ where: { id: id } })

        if (target == null) {
            return JSON.stringify('client not found')
        } else {
            entity.modified = new Date()

            await this.loansRepo.update(id, entity)

            return entity
        }
    }

    async delete(id: number): Promise<void> {
        await this.loansRepo.delete(id);
    }
}
