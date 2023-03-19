import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { LoansEntity } from "src/loans/loans.entity";

@Entity('clientes')
export class ClientsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    avatar: string;

    @Column()
    username: string;

    @Column()
    password: string;

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
    role: string;

    @OneToMany(() => LoansEntity, loan => loan.client)
    loans: LoansEntity[];

    @Column()
    created: Date;

    @Column()
    modified: Date;

    @Column()
    accessed: Date;
}