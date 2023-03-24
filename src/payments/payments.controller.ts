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
    read(@Param('id') id: number): Promise<PaymentsEntity | string> {
        return this.paymentService.read(id);
    }

    @Get('balance/:id')
    loanBalance(@Param('id') id: number): Promise<String> {
        return this.paymentService.readLoanBalance(id);
    }

    @Get('balanceclient/:id')
    clientBalancePerLoan(@Param('id') id: number) {
        return this.paymentService.readclientBalancePerLoan(id);
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() dto: PaymentsDTO): Promise<string> {
        return this.paymentService.update(id, dto)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<String> {
        return this.paymentService.delete(id);
    }
}
