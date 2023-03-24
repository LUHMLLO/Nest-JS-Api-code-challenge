import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsEntity } from './payments.entity';
import { LoansEntity } from 'src/loans/loans.entity';
import { ClientsEntity } from 'src/clients/clients.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PaymentsEntity, LoansEntity, ClientsEntity])],
    controllers: [PaymentsController],
    providers: [PaymentsService],
    exports: [TypeOrmModule]
})
export class PaymentsModule { }
