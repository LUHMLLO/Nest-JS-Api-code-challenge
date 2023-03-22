import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansController } from './payments.controller';
import { LoansService } from './payments.service';
import { LoansEntity } from './payments.entity';
import { ClientsEntity } from 'src/clients/clients.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LoansEntity, ClientsEntity])],
    controllers: [LoansController],
    providers: [LoansService],
    exports: [TypeOrmModule]
})
export class LoansModule { }
