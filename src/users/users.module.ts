import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { ClientsEntity } from 'src/clients/clients.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity, ClientsEntity])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [TypeOrmModule]
})
export class UsersModule { }
