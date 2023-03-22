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

    async allClientsUsers(): Promise<ClientsEntity[]> {
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

        if (isIdentification) {
            return JSON.stringify('client already exists')
        }

        if (isEmail) {
            return JSON.stringify('email already in use')
        }

        if (isPhone) {
            return JSON.stringify('phone already in use')
        }

        entity.created = new Date()

        return this.clientsRepo.save(entity)
    }

    async read(id: number): Promise<ClientsEntity | string> {
        const target = await this.clientsRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('client not found')
        }

        return target
    }

    async update(id: number, entity: ClientsEntity): Promise<ClientsEntity | string> {
        const target = await this.clientsRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('client not found')
        }

        entity.modified = new Date()

        await this.clientsRepo.update(id, entity)

        return entity
    }

    async delete(id: number): Promise<string> {
        const target = await this.clientsRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('client not found')
        }

        await this.clientsRepo.delete(id);

        return JSON.stringify(`client '${target.first_name} ${target.last_name}' deleted`)
    }
}
