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

import { PaymentsController } from './payments/payments.controller';
import { PaymentsModule } from './payments/payments.module';
import { PaymentsService } from './payments/payments.service';

import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    ClientsModule,
    LoansModule,
    PaymentsModule,
    UsersModule,
  ],
  controllers: [AppController, ClientsController, LoansController, PaymentsController, UsersController],
  providers: [AppService, ClientsService, LoansService, PaymentsService, UsersService],
})

export class AppModule { }
