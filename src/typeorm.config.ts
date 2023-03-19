import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const OrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'bankadmin',
    password: 'tS6k@8C2',
    database: 'realbank',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: false,
    retryDelay: 3000,
    retryAttempts: 10,
    autoLoadEntities: true
}