import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { LoansEntity } from 'src/loans/loans.entity';

@Entity('clientes')
export class ClientsEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @OneToOne(() => UsersEntity, (user) => user.client)
    user: UsersEntity;

    @OneToMany(() => LoansEntity, (loan) => loan.client)
    loans: LoansEntity[];

    @Column({ unique: true })
    identification: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    created: Date;

    @Column({ nullable: true })
    modified: Date;
}