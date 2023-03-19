import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { LoansController } from './loans/loans.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    ClientsModule
  ],
  controllers: [AppController, ClientsController, LoansController],
  providers: [AppService, ClientsService],
})

export class AppModule { }
