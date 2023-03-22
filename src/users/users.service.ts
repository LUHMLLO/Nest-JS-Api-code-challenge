import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity'
import { ClientsEntity } from 'src/clients/clients.entity';
import { AuthRoles } from 'src/utils.enums';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepo: Repository<UsersEntity>,

        @InjectRepository(ClientsEntity)
        private readonly clientsRepo: Repository<ClientsEntity>,
    ) { }

    async all(): Promise<UsersEntity[]> {
        return this.usersRepo.find()
    }

    async create(dto: any): Promise<UsersEntity | string> {
        const targetClient = await this.clientsRepo.findOne({ where: { id: dto.clientID } })
        const isUsername = await this.usersRepo.findOne({ where: { username: dto.username } })

        if (!targetClient) {
            return JSON.stringify('client not found')
        }

        if (isUsername) {
            return JSON.stringify('username already in use')
        }

        if (dto.role in AuthRoles) {
            const user = new UsersEntity()

            user.client = targetClient
            user.avatar = dto.avatar
            user.username = dto.username
            user.password = dto.password
            user.role = dto.role
            user.created = new Date()
            //user.modified = new Date(0)
            //user.accessed = new Date(0)

            return this.usersRepo.save(user)
        } else {
            return JSON.stringify('invalid auth role')
        }
    }

    async read(id: number): Promise<UsersEntity | string> {
        const target = await this.usersRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('client not found')
        }

        return target
    }

    async update(id: number, entity: UsersEntity): Promise<UsersEntity | string> {
        const target = await this.usersRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('user not found')
        }

        entity.modified = new Date()

        await this.usersRepo.update(id, entity)

        return entity
    }

    async delete(id: number): Promise<string> {
        const target = await this.usersRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('user not found')
        }

        await this.usersRepo.delete(id);

        return JSON.stringify(`user '${target.username}}' deleted`)
    }
}
