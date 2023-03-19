import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { LoansEntity } from './loans.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LoansEntity])],
    controllers: [LoansController],
    providers: [LoansService],
    exports: [TypeOrmModule]
})
export class LoansModule { }
