import { Controller, Get, Post, Delete, Patch, Body, Param, } from '@nestjs/common';
import { LoansService } from './payments.service';
import { LoansEntity } from './payments.entity';

@Controller('prestamo')
export class LoansController {
    constructor(private loanService: LoansService) { }

    @Get('list')
    all(): Promise<LoansEntity[]> {
        return this.loanService.all();
    }

    @Post('create')
    create(@Body() entity: any): Promise<LoansEntity | string> {
        return this.loanService.create(entity)
    }

    @Get('read/:id')
    read(@Param('id') id: number) {
        return this.loanService.read(id);
    }

    @Patch('approve/:id')
    readStatus(@Param('id') id: number) {
        return this.loanService.approve(id);
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() entity: LoansEntity): Promise<LoansEntity | string> {
        return this.loanService.update(id, entity)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<void> {
        return this.loanService.delete(id);
    }
}
