import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientsEntity } from './clients.entity';
import { UsersEntity } from 'src/users/users.entity';
import { LoansEntity } from 'src/loans/loans.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ClientsEntity, UsersEntity, LoansEntity])],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports: [TypeOrmModule]
})
export class ClientsModule { }
