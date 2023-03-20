import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { LoansEntity } from './loans.entity';
import { ClientsEntity } from 'src/clients/clients.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LoansEntity, ClientsEntity])],
    controllers: [LoansController],
    providers: [LoansService],
    exports: [TypeOrmModule]
})
export class LoansModule { }
