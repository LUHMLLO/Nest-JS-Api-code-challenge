import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('prestamos')
export class LoansEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    client: number;

    @Column()
    amount_requested: number;

    @Column()
    amount_approved: number;

    @Column()
    payment_method: string;

    @Column()
    number_of_payments: number;

    @Column('decimal', { precision: 6, scale: 2 })
    interest_rate: number;

    @Column('decimal', { precision: 6, scale: 2 })
    monthly_fees: number;

    @Column()
    created: Date;

    @Column()
    modified: Date;
}