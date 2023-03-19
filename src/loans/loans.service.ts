import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoansEntity } from './loans.entity'

@Injectable()
export class LoansService {
    constructor(
        @InjectRepository(LoansEntity)
        private readonly loansRepo: Repository<LoansEntity>,
    ) { }

    async readTable(): Promise<LoansEntity[]> {
        return this.loansRepo.find()
    }

    async create(entity: LoansEntity): Promise<LoansEntity> {
        entity["created"] = new Date()
        entity["modified"] = new Date(0)
        return this.loansRepo.save(entity)
    }

    async readLoan(id: number): Promise<LoansEntity | null> {
        return this.loansRepo.findOneBy({ id })
    }
    
    async readLoanStatus(id: number): Promise<LoansEntity | null> {
        return this.loansRepo.findOneBy({ id })
    }

    async update(id: number, entity: LoansEntity): Promise<LoansEntity | null> {
        entity["modified"] = new Date()
        await this.loansRepo.update(id, entity)
        return this.loansRepo.findOneBy({ id })
    }

    async delete(id: number): Promise<void> {
        await this.loansRepo.delete(id);
    }
}
