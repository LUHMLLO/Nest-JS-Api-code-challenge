import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Patch, Delete, Body, Param, } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { CreateUsersDTO, UsersDTO } from './users.dto';
@ApiTags('usuario')
@Controller('usuario')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get('list')
    all(): Promise<UsersEntity[]> {
        return this.userService.all();
    }

    @Post('create')
    create(@Body() dto: CreateUsersDTO): Promise<UsersEntity | string> {
        return this.userService.create(dto)
    }

    @Get('read/:id')
    read(@Param('id') id: number): Promise<UsersEntity | string> {
        return this.userService.read(id);
    }

    @Patch('update/:id')
    update(@Param('id') id: number, @Body() dto: UsersDTO): Promise<UsersEntity | string> {
        return this.userService.update(id, dto)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: number): Promise<string> {
        return this.userService.delete(id);
    }
}