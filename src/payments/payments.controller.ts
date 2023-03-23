import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Delete, Body, Param, } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsEntity } from './payments.entity';

@ApiTags('pago')
@Controller('pago')
export class PaymentsController {
    constructor(private paymentService: PaymentsService) { }

    @Get('list')
    all(): Promise<PaymentsEntity[]> {
        return this.paymentService.all();
    }

    @Post('create')
    create(@Body() entity: any): Promise<PaymentsEntity | string> {
        return this.paymentService.create(entity)
    }

    @Get('read/:id')
    read(@Param('id') id: number) {
        return this.paymentService.read(id);
    }

    @Patch('approve/:id')
    readStatus(@Param('id') id: number) {
        return this.paymentService.approve(id);
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() entity: PaymentsEntity): Promise<PaymentsEntity | string> {
        return this.paymentService.update(id, entity)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<void> {
        return this.paymentService.delete(id);
    }
}
