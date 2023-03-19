import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ClientsEntity } from '../clients/clients.entity';

@Entity('prestamos')
export class LoansEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ClientsEntity, client => client.loans)
    client: ClientsEntity;

    @Column()
    amount_requested: number;

    @Column()
    amount_approved: number;

    @Column()
    payment_method: string;

    @Column()
    number_of_payments: number;

    @Column()
    interest_rate: number;

    @Column()
    monthly_fees: number;

    @Column()
    created: Date;

    @Column()
    modified: Date;
}