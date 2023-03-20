import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ClientsEntity } from 'src/clients/clients.entity';

@Entity('prestamos')
export class LoansEntity {
    @PrimaryGeneratedColumn()
    id: number;

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
    status: boolean;

    @Column()
    created: Date;

    @Column()
    modified: Date;

    @ManyToOne(() => ClientsEntity, (client) => client.loans)
    @JoinColumn({ name: 'client_id' })
    client: ClientsEntity
}