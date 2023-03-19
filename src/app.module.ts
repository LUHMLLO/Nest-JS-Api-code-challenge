import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './typeorm.config';
import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';
import { ClientsModule } from './clients/clients.module';
import { LoansController } from './loans/loans.controller';
import { LoansModule } from './loans/loans.module';
import { LoansService } from './loans/loans.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    ClientsModule, LoansModule
  ],
  controllers: [AppController, ClientsController, LoansController],
  providers: [AppService, ClientsService, LoansService],
})

export class AppModule { }
