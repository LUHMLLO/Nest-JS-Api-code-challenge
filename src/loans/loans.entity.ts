import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ClientsEntity } from 'src/clients/clients.entity';
import { PaymentFrequencies } from 'src/utils.enums';
import { PaymentsEntity } from 'src/payments/payments.entity';
@Entity('prestamos')
export class LoansEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => ClientsEntity, (client) => client.loans)
  @JoinColumn({ name: 'client_id' })
  client: ClientsEntity

  @OneToMany(() => PaymentsEntity, (payment) => payment.loan)
  payments: PaymentsEntity[]

  @Column('decimal', { scale: 2 })
  requested_amount: number;

  @Column('decimal', { precision: 6, scale: 2 })
  interest_rate: number;

  @Column()
  term_duration: number;

  @Column({
    type: 'enum',
    enum: PaymentFrequencies,
  })
  term_frequency: PaymentFrequencies;

  @Column('decimal', { scale: 2 })
  total_interest: number

  @Column('decimal', { scale: 2 })
  total_loan: number;

  @Column('decimal', { scale: 2 })
  monthly_interest: number;

  @Column('decimal', { scale: 2 })
  monthly_payment: number;

  @Column('decimal', { scale: 2 })
  monthly_fee: number;

  @Column()
  approval: boolean;

  @Column()
  payments_pending: number;

  @Column()
  payments_fullfilled: number;

  @Column('decimal', { scale: 2 })
  current_balance: number;

  @Column()
  created: Date;

  @Column({ nullable: true })
  modified: Date;
}