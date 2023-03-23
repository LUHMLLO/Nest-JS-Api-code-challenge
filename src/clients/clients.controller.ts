import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsEntity } from './clients.entity';

@ApiTags('cliente')
@Controller('cliente')
export class ClientsController {
    constructor(private clientService: ClientsService) { }

    @Get('list')
    @ApiCreatedResponse({
        description: 'The record has been successfully obtained.',
        type: [ClientsEntity],
    })
    all(): Promise<ClientsEntity[]> {
        return this.clientService.all();
    }

    @Get('list-clients')
    @ApiCreatedResponse({
        description: 'The record has been successfully obtained.',
        type: [ClientsEntity],
    })
    allClientsOnly(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsOnly();
    }

    @Get('list-users')
    @ApiCreatedResponse({
        description: 'The record has been successfully obtained.',
        type: [ClientsEntity],
    })
    allClientsUsers(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsUsers();
    }

    @Get('list-loans')
    @ApiCreatedResponse({
        description: 'The record has been successfully obtained.',
        type: [ClientsEntity],
    })
    allClientsLoans(): Promise<ClientsEntity[]> {
        return this.clientService.allClientsLoans();
    }

    @Post('create')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ClientsEntity,
    })
    create(@Body() dto: any): Promise<ClientsEntity | string> {
        return this.clientService.create(dto)
    }

    @Get('read/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully obtained.',
        type: ClientsEntity,
    })
    read(@Param('id') id: number): Promise<ClientsEntity | string> {
        return this.clientService.read(id);
    }

    @Patch('update/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully patched.',
        type: ClientsEntity,
    })
    update(@Param('id') id: number, @Body() dto: any): Promise<ClientsEntity | string> {
        return this.clientService.update(id, dto)
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully deleted.',
        type: String,
    })
    delete(@Param('id') id: number): Promise<string> {
        return this.clientService.delete(id);
    }
}