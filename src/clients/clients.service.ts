import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsEntity } from './clients.entity'

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientsEntity)
        private readonly clientsRepo: Repository<ClientsEntity>,
    ) { }

    async readTable(): Promise<ClientsEntity[]> {
        return this.clientsRepo.find()
    }

    async create(entity: ClientsEntity): Promise<ClientsEntity> {
        entity["created"] = new Date()
        entity["modified"] = new Date(0)
        entity["accessed"] = new Date(0)
        return this.clientsRepo.save(entity)
    }

    async read(id: number): Promise<ClientsEntity | null> {
        return this.clientsRepo.findOneBy({ id })
    }

    async update(id: number, entity: ClientsEntity): Promise<ClientsEntity | null> {
        entity["modified"] = new Date()
        await this.clientsRepo.update(id, entity)
        return this.clientsRepo.findOneBy({ id })
    }

    async delete(id: number): Promise<void> {
        await this.clientsRepo.delete(id);
    }
}
