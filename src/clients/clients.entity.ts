import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('clientes')
export class ClientsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    identification: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    created: Date;

    @Column()
    modified: Date;
}