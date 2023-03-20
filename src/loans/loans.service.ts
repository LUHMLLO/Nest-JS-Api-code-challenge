import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoansEntity } from './loans.entity'
import { ClientsEntity } from 'src/clients/clients.entity';

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

    async create(dto: any): Promise<LoansEntity> {
        const targetClient = await this.clientsRepo.findOne({ where: { id: dto.clientID } })
        const loan = new LoansEntity()

        if (targetClient != null) {
            loan.client = targetClient
        }

        loan.amount_requested = dto.amount_requested
        loan.amount_approved = dto.amount_approved
        loan.payment_method = dto.payment_method
        loan.number_of_payments = dto.number_of_payments
        loan.interest_rate = dto.interest_rate
        loan.monthly_fees = dto.monthly_fees
        loan.status = false
        loan.created = new Date()
        loan.modified = new Date(0)

        return this.loansRepo.save(loan)
    }

    async approve(id: number): Promise<LoansEntity | null> {
        const loan = new LoansEntity()

        loan.status = true

        await this.loansRepo.update(id, loan)

        return this.loansRepo.findOneBy({ id })
    }

    async read(id: number): Promise<LoansEntity | null> {
        return this.loansRepo.findOneBy({ id })
    }

    async update(id: number, entity: LoansEntity): Promise<LoansEntity | null> {
        entity.modified = new Date()

        await this.loansRepo.update(id, entity)

        return this.loansRepo.findOneBy({ id })
    }

    async delete(id: number): Promise<void> {
        await this.loansRepo.delete(id);
    }
}
