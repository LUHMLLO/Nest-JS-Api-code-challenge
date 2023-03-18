import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepo: Repository<UsersEntity>,
    ) { }

    readTable() {
        return this.usersRepo.find()
    }

    create(body: any) {
        const newUser = this.usersRepo.create(body)
        return this.usersRepo.save(newUser)
    }

    read(id: number) {
        return this.usersRepo.findOneBy({ id: id })
    }

    // async update(id: number, body: any) {
    //     let user = this.usersRepo.findOneBy({ id: id })
    //     let obtainedUser: UsersEntity = await user
    //     this.usersRepo.merge(obtainedUser, body)
    //     return this.usersRepo.save(obtainedUser)
    // }

    async delete(id: number): Promise<void> {
        await this.usersRepo.delete(id);
    }
}
