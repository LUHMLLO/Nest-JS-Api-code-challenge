import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('clientes')
export class ClientsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 16 })
    username: string;

    @Column({ length: 250 })
    password: string;

    @Column({ length: 250 })
    avatar: string;

    @Column({ length: 32 })
    name: string;

    @Column()
    email: string;

    @Column({ length: 14 })
    phone: string;

    @Column({ length: 8 })
    role: string;

    @Column()
    created: Date;

    @Column()
    modified: Date;

    @Column()
    accessed: Date;
}