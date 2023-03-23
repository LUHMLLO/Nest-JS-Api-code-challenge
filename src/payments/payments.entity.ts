import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LoansEntity } from 'src/loans/loans.entity';

@Entity('pagos')
export class PaymentsEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => LoansEntity, (loan) => loan.payments)
    loan: LoansEntity

    @Column('decimal', { scale: 2 })
    requested_amount: number;

    @Column('decimal', { precision: 6, scale: 2 })
    interest_rate: number;

    @Column()
    term_duration: number;

    @Column()
    term_frequency: string;

    @Column('decimal', { scale: 2 })
    total_interest: number

    @Column('decimal', { scale: 2 })
    total_payment: number;

    @Column('decimal', { scale: 2 })
    monthly_interest: number;

    @Column('decimal', { scale: 2 })
    monthly_payment: number;

    @Column()
    approval_status: boolean;

    @Column('decimal', { scale: 2 })
    current_balance: number;

    @Column()
    payments_pending: number;

    @Column()
    payments_fullfilled: number;

    @Column()
    created: Date;

    @Column({ nullable: true })
    modified: Date;
}