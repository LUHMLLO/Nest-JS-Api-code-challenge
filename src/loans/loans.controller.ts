import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansEntity } from "./loans.entity"

@Controller('prestamo')
export class LoansController {
    constructor(private loanService: LoansService) { }

    @Get('list')
    list(): Promise<LoansEntity[]> {
        return this.loanService.readTable();
    }

    @Post('request')
    create(@Body() entity: LoansEntity): Promise<LoansEntity> {
        return this.loanService.create(entity)
    }

    @Get('amortization/:id')
    read(@Param('id') id: number) {
        return this.loanService.readLoan(id);
    }
    
    @Get('approval/:id')
    readStatus(@Param('id') id: number) {
        return this.loanService.readLoanStatus(id);
    }

    @Put('update/:id')
    update(@Param('id') id: number, @Body() entity: LoansEntity): Promise<LoansEntity | null> {
        return this.loanService.update(id, entity)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<void> {
        return this.loanService.delete(id);
    }
}
