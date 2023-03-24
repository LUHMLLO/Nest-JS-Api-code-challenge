import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity'
import { ClientsEntity } from 'src/clients/clients.entity';
import { AuthRoles } from 'src/utils.enums';
import { CreateUsersDTO, UsersDTO } from './users.dto';

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

    async create(dto: CreateUsersDTO): Promise<UsersEntity | string> {
        const target = await this.clientsRepo.findOne({ where: { id: dto.clientID } })
        const isUsername = await this.usersRepo.findOne({ where: { username: dto.username } })

        if (!target) {
            return JSON.stringify('client not found')
        }

        if (isUsername) {
            return JSON.stringify('username already in use')
        }

        if (dto.role in AuthRoles) {
            const user = new UsersEntity()

            user.client = target
            user.avatar = dto.avatar
            user.username = dto.username
            user.password = dto.password
            user.role = dto.role
            user.created = new Date()

            this.usersRepo.save(user)

            target.modified = new Date()
            this.clientsRepo.update(target.id, target)

            return user
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

    async update(id: number, dto: UsersDTO): Promise<string> {
        const target = await this.usersRepo.findOne({ where: { id: id } })

        if (!target) {
            return JSON.stringify('user not found')
        }

        dto.modified = new Date()

        await this.usersRepo.update(id, dto)

        return 'user updated'
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
