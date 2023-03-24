import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LoansEntity } from 'src/loans/loans.entity';

@Entity('pagos')
export class PaymentsEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => LoansEntity, (loan) => loan.payments)
    @JoinColumn({ name: 'loan_id' })
    loan: LoansEntity

    @Column('decimal', { scale: 2 })
    initial_balance: number;

    @Column('decimal', { scale: 2 })
    issued_payment: number;

    @Column('decimal', { scale: 2 })
    final_balance: number;

    @Column()
    created: Date;

    @Column({ nullable: true })
    modified: Date;
}