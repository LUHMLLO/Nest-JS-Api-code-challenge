import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UsersEntity } from "./entities/users.entity"
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    readTable() {
        return this.usersService.readTable();
    }

    @Post()
    create(@Body() body: UsersEntity) {
        return this.usersService.create(body)
    }

    @Get(':id')
    read(@Param('id') id: number) {
        return this.usersService.read(id);
    }

    // @Put(':id')
    // update(@Param('id') id: number, @Body() body: UsersEntity) {
    //     return this.usersService.update(id, body)
    // }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.usersService.delete(id);
    }
}