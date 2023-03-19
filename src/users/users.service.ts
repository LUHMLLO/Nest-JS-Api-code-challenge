import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepo: Repository<UsersEntity>,
    ) { }

    async readTable(): Promise<UsersEntity[]> {
        return this.usersRepo.find()
    }

    async create(entity: UsersEntity): Promise<UsersEntity> {
        entity["created"] = new Date()
        entity["modified"] = new Date(0)
        entity["accessed"] = new Date(0)
        return this.usersRepo.save(entity)
    }

    async read(id: number): Promise<UsersEntity | null> {
        return this.usersRepo.findOneBy({ id })
    }

    async update(id: number, entity: UsersEntity): Promise<UsersEntity | null> {
        entity["modified"] = new Date()
        await this.usersRepo.update(id, entity)
        return this.usersRepo.findOneBy({ id })
    }

    async delete(id: number): Promise<void> {
        await this.usersRepo.delete(id);
    }
}
