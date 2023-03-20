import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';

@Controller('usuario')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get('list')
    all(): Promise<UsersEntity[]> {
        return this.userService.all();
    }

    @Post('create')
    create(@Body() entity: UsersEntity): Promise<UsersEntity | string> {
        return this.userService.create(entity)
    }

    @Get('read/:id')
    read(@Param('id') id: number) {
        return this.userService.read(id);
    }

    @Put('update/:id')
    update(@Param('id') id: number, @Body() entity: UsersEntity): Promise<UsersEntity | null> {
        return this.userService.update(id, entity)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<void> {
        return this.userService.delete(id);
    }
}