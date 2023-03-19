import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsEntity } from "./clients.entity"

@Controller('cliente')
export class ClientsController {
    constructor(private clientService: ClientsService) { }

    @Get('list')
    readTable(): Promise<ClientsEntity[]> {
        return this.clientService.readTable();
    }

    @Post('create')
    create(@Body() entity: ClientsEntity): Promise<ClientsEntity> {
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