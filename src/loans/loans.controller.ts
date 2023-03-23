import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Delete, Patch, Body, Param, } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansEntity } from './loans.entity';
import { CreateLoansDTO, LoansDTO } from './loans.dto';

@ApiTags('prestamo')
@Controller('prestamo')
export class LoansController {
    constructor(private loanService: LoansService) { }

    @Get('list')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: [LoansEntity],
    })
    all(): Promise<LoansEntity[]> {
        return this.loanService.all();
    }

    @Post('create')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: LoansEntity,
    })
    create(@Body() dto: CreateLoansDTO): Promise<LoansEntity | string> {
        return this.loanService.create(dto)
    }

    @Get('read/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: LoansEntity,
    })
    read(@Param('id') id: number): Promise<LoansEntity | string> {
        return this.loanService.read(id);
    }

    @Patch('approve/:id')
    readStatus(@Param('id') id: number): Promise<LoansEntity | string> {
        return this.loanService.approve(id);
    }

    @Patch('update/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: LoansEntity,
    })
    update(@Param('id') id: number, @Body() dto: LoansDTO): Promise<LoansEntity | string> {
        return this.loanService.update(id, dto)
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: String,
    })
    delete(@Param('id') id: number): Promise<string> {
        return this.loanService.delete(id);
    }
}
