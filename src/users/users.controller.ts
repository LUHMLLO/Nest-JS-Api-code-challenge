import { Controller, Get, Post, Delete, Body, Param, Patch } from '@nestjs/common';
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
    create(@Body() dto: any): Promise<UsersEntity | string> {
        return this.userService.create(dto)
    }

    @Get('read/:id')
    read(@Param('id') id: number): Promise<UsersEntity | string> {
        return this.userService.read(id);
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() dto: any): Promise<UsersEntity | string> {
        return this.userService.update(id, dto)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<string> {
        return this.userService.delete(id);
    }
}