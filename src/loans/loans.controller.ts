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

    @Post('create')
    create(@Body() dto: CreateLoansDTO): Promise<LoansEntity | string> {
        return this.loanService.create(dto)
    }

    @Get('read/:id')
    read(@Param('id') id: number): Promise<LoansEntity | string> {
        return this.loanService.read(id);
    }

    @Patch('approve/:id')
    readStatus(@Param('id') id: number): Promise<LoansEntity | string> {
        return this.loanService.approve(id);
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() dto: LoansDTO): Promise<LoansEntity | string> {
        return this.loanService.update(id, dto)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<string> {
        return this.loanService.delete(id);
    }
}
