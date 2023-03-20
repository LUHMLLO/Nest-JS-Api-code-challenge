import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './typeorm.config';

import { ClientsController } from './clients/clients.controller';
import { ClientsModule } from './clients/clients.module';
import { ClientsService } from './clients/clients.service';

import { LoansController } from './loans/loans.controller';
import { LoansModule } from './loans/loans.module';
import { LoansService } from './loans/loans.service';

import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    ClientsModule,
    LoansModule,
    UsersModule,
  ],
  controllers: [AppController, ClientsController, LoansController, UsersController],
  providers: [AppService, ClientsService, LoansService, UsersService],
})

export class AppModule { }
