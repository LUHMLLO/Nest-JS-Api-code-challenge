import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from "./users.entity"

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    readTable(): Promise<UsersEntity[]> {
        return this.usersService.readTable();
    }

    @Post()
    create(@Body() entity: UsersEntity): Promise<UsersEntity> {
        return this.usersService.create(entity)
    }

    @Get(':id')
    read(@Param('id') id: number) {
        return this.usersService.read(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() entity: UsersEntity): Promise<UsersEntity | null> {
        return this.usersService.update(id, entity)
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.usersService.delete(id);
    }
}