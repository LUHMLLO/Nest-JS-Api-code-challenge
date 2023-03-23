import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
@ApiTags('usuario')
@Controller('usuario')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get('list')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: [UsersEntity],
    })
    all(): Promise<UsersEntity[]> {
        return this.userService.all();
    }

    @Post('create')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: UsersEntity,
    })
    create(@Body() dto: any): Promise<UsersEntity | string> {
        return this.userService.create(dto)
    }

    @Get('read/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: UsersEntity,
    })
    read(@Param('id') id: number): Promise<UsersEntity | string> {
        return this.userService.read(id);
    }

    @Patch('update/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: UsersEntity,
    })
    update(@Param('id') id: number, @Body() dto: any): Promise<UsersEntity | string> {
        return this.userService.update(id, dto)
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: String,
    })
    delete(@Param('id') id: number): Promise<string> {
        return this.userService.delete(id);
    }
}