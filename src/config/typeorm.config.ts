import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'bankadmin',
    password: 'tS6k@8C2',
    database: 'realbank',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    retryDelay: 3000,
    retryAttempts: 10,
    autoLoadEntities: true
}