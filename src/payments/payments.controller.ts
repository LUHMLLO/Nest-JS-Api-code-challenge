import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Delete, Patch, Body, Param, } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsEntity } from './payments.entity';

@ApiTags('pago')
@Controller('pago')
export class PaymentsController {
    constructor(private paymentService: PaymentsService) { }

    @Get('list')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: [PaymentsEntity],
    })
    all(): Promise<PaymentsEntity[]> {
        return this.paymentService.all();
    }

    @Post('create')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: PaymentsEntity,
    })
    create(@Body() entity: any): Promise<PaymentsEntity | string> {
        return this.paymentService.create(entity)
    }

    @Get('read/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: PaymentsEntity,
    })
    read(@Param('id') id: number) {
        return this.paymentService.read(id);
    }

    @Patch('approve/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: PaymentsEntity,
    })
    readStatus(@Param('id') id: number) {
        return this.paymentService.approve(id);
    }

    @Patch('update/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: PaymentsEntity,
    })
    update(@Param('id') id: number, @Body() entity: PaymentsEntity): Promise<PaymentsEntity | string> {
        return this.paymentService.update(id, entity)
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: String,
    })
    delete(@Param('id') id: number): Promise<void> {
        return this.paymentService.delete(id);
    }
}
