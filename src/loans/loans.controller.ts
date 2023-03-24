import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Delete, Body, Param, } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansEntity } from './loans.entity';
import { CreateLoansDTO, LoansDTO } from './loans.dto';

@ApiTags('prestamo')
@Controller('prestamo')
export class LoansController {
    constructor(private loanService: LoansService) { }

    @Get('list')
    all(): Promise<LoansEntity[]> {
        return this.loanService.all();
    }
    @Get('list/payments')
    allLoansPayments(): Promise<LoansEntity[]> {
        return this.loanService.allLoansPayments();
    }

    @Post(['create', 'request'])
    create(@Body() dto: CreateLoansDTO): Promise<LoansEntity | String> {
        return this.loanService.create(dto)
    }

    @Get(['read/:id', 'amortization/:id'])
    read(@Param('id') id: number): Promise<LoansEntity | String> {
        return this.loanService.read(id);
    }

    @Patch('approve/:id')
    readStatus(@Param('id') id: number): Promise<LoansEntity | String> {
        return this.loanService.approve(id);
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() dto: LoansDTO): Promise<String> {
        return this.loanService.update(id, dto)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<String> {
        return this.loanService.delete(id);
    }
}
