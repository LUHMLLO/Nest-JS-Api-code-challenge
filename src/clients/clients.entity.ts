import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { LoansEntity } from 'src/loans/loans.entity';

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

    @OneToOne(() => UsersEntity)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;

    @OneToMany(() => LoansEntity, (loan) => loan.client)
    loans: LoansEntity[];
}