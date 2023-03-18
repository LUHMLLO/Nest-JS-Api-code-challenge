import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    readTable(): string {
        return "all users will be rendered as a json list here";
    }

    @Post()
    insertUser(): string {
        return "insert user"
    }
    @Get()
    readtUser(): string {
        return "insert user"
    }
    @Put()
    updateUser(): string {
        return "insert user"
    }
    @Delete()
    deleteUser(): string {
        return "insert user"
    }
}