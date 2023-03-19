import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientsEntity } from './clients.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ClientsEntity])],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports: [TypeOrmModule]
})
export class ClientsModule { }
