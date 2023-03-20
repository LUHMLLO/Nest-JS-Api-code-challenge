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

    async all(): Promise<ClientsEntity[]> {
        return this.clientsRepo.find({
            relations: ['user', 'loans']
        })
    }
    async allClientsOnly(): Promise<ClientsEntity[]> {
        return this.clientsRepo.find()
    }
    async allClientsUser(): Promise<ClientsEntity[]> {
        return this.clientsRepo.find({
            relations: ['user']
        })
    }
    async allClientsLoans(): Promise<ClientsEntity[]> {
        return this.clientsRepo.find({
            relations: ['loans']
        })
    }

    async create(entity: ClientsEntity): Promise<ClientsEntity | string> {
        const isIdentification = await this.clientsRepo.findOne({ where: { identification: entity.identification } })
        const isEmail = await this.clientsRepo.findOne({ where: { email: entity.email } })
        const isPhone = await this.clientsRepo.findOne({ where: { phone: entity.phone } })

        if (isIdentification != null) {
            return JSON.stringify('client already exists')
        } else if (isEmail != null) {
            return JSON.stringify('email already in use')
        } else if (isPhone != null) {
            return JSON.stringify('phone already in use')
        }
        else {
            entity.created = new Date()
            entity.modified = new Date(0)

            return this.clientsRepo.save(entity)
        }
    }

    async read(id: number): Promise<ClientsEntity | null> {
        return this.clientsRepo.findOneBy({ id })
    }

    async update(id: number, entity: ClientsEntity): Promise<ClientsEntity | null> {
        entity.modified = new Date()

        await this.clientsRepo.update(id, entity)

        return this.clientsRepo.findOneBy({ id })
    }

    async delete(id: number): Promise<void> {
        await this.clientsRepo.delete(id);
    }
}
