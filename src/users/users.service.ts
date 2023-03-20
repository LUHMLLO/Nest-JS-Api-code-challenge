import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity'
import { ClientsEntity } from 'src/clients/clients.entity';

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

        if (targetClient == null) {
            return JSON.stringify('cannot create an user for a client that does not exist')
        }

        if (isUsername != null) {
            return JSON.stringify('username already in use')
        } else {
            const user = new UsersEntity()

            user.client = targetClient
            user.avatar = dto.avatar
            user.username = dto.username
            user.password = dto.password
            user.role = dto.role
            user.created = new Date()
            user.modified = new Date(0)
            user.accessed = new Date(0)

            return this.usersRepo.save(user)
        }
    }

    async read(id: number): Promise<UsersEntity | null> {
        return this.usersRepo.findOneBy({ id })
    }

    async update(id: number, entity: UsersEntity): Promise<UsersEntity | null> {
        entity.modified = new Date()

        await this.usersRepo.update(id, entity)

        return this.usersRepo.findOneBy({ id })
    }

    async delete(id: number): Promise<void> {
        await this.usersRepo.delete(id);
    }
}
