import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Delete, Body, Param, } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsEntity } from './payments.entity';
import { CreatePaymentsDTO, PaymentsDTO } from './payments.dto';

@ApiTags('pago')
@Controller('pago')
export class PaymentsController {
    constructor(private paymentService: PaymentsService) { }

    @Get('list')
    all(): Promise<PaymentsEntity[]> {
        return this.paymentService.all();
    }

    @Post(['create', 'cuota', 'abono'])
    create(@Body() dto: CreatePaymentsDTO): Promise<PaymentsEntity | string> {
        return this.paymentService.create(dto)
    }

    @Get('read/:id')
    read(@Param('id') id: number) {
        return this.paymentService.read(id);
    }

    @Get('balance/:id')
    balance(@Param('id') id: number) {
        return this.paymentService.readLoanBalance(id);
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() dto: PaymentsDTO): Promise<PaymentsEntity | string> {
        return this.paymentService.update(id, dto)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<void> {
        return this.paymentService.delete(id);
    }
}
