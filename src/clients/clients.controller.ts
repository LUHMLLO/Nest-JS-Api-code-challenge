import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsEntity } from './clients.entity';

@Controller('cliente')
export class ClientsController {
    constructor(private clientService: ClientsService) { }

    @Get('list')
    all(): Promise<ClientsEntity[]> {
        return this.clientService.all();
    }

    @Get('list-clients')
    allClientsOnly(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsOnly();
    }

    @Get('list-users')
    allClientsUsers(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsUsers();
    }

    @Get('list-loans')
    allClientsLoans(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsLoans();
    }

    @Post('create')
    create(@Body() dto: any): Promise<ClientsEntity | string> {
        return this.clientService.create(dto)
    }

    @Get('read/:id')
    read(@Param('id') id: number): Promise<ClientsEntity | string> {
        return this.clientService.read(id);
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() dto: any): Promise<ClientsEntity | string> {
        return this.clientService.update(id, dto)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<string> {
        return this.clientService.delete(id);
    }
}