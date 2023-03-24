import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Delete, Body, Param, } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsEntity } from './clients.entity';
import { ClientsDTO, CreateClientsDTO } from './clients.dto';

@ApiTags('cliente')
@Controller('cliente')
export class ClientsController {
    constructor(private clientService: ClientsService) { }

    @Get('list')
    all(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsOnly();
    }

    @Get('list/users')
    allClientsUsers(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsUsers();
    }

    @Get('list/loans')
    allClientsLoans(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsLoans();
    }

    @Get('list/details')
    allClientsOnly(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsDetails();
    }

    @Post('create')
    create(@Body() dto: CreateClientsDTO): Promise<ClientsEntity | String> {
        return this.clientService.create(dto)
    }

    @Get('read/:id')
    read(@Param('id') id: number): Promise<ClientsEntity | String> {
        return this.clientService.read(id);
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() dto: ClientsDTO): Promise<String> {
        return this.clientService.update(id, dto)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<String> {
        return this.clientService.delete(id);
    }
}