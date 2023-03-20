import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
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
    allClients(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsOnly();
    }

    @Get('list-users')
    allUser(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsUser();
    }

    @Get('list-loans')
    allLoans(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsLoans();
    }

    @Post('create')
    create(@Body() entity: ClientsEntity): Promise<ClientsEntity | string> {
        return this.clientService.create(entity)
    }

    @Get('read/:id')
    read(@Param('id') id: number) {
        return this.clientService.read(id);
    }

    @Put('update/:id')
    update(@Param('id') id: number, @Body() entity: ClientsEntity): Promise<ClientsEntity | null> {
        return this.clientService.update(id, entity)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<void> {
        return this.clientService.delete(id);
    }
}