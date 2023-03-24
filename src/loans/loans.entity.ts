import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ClientsEntity } from 'src/clients/clients.entity';
import { PaymentFrequencies } from 'src/utils.enums';
import { PaymentsEntity } from 'src/payments/payments.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity('prestamos')
export class LoansEntity {
  @ApiProperty({ type: BigInt })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ type: () => ClientsEntity, })
  @ManyToOne(() => ClientsEntity, (client) => client.loans)
  @JoinColumn({ name: 'client_id' })
  client: ClientsEntity

  @ApiProperty({ type: () => [LoansEntity], })
  @OneToMany(() => PaymentsEntity, (payment) => payment.loan)
  payments: PaymentsEntity[]

  @ApiProperty({ type: Number, })
  @Column('decimal', { scale: 2 })
  requested_amount: number;

  @ApiProperty({ type: Number, })
  @Column('decimal', { precision: 6, scale: 2 })
  interest_rate: number;

  @ApiProperty({ type: Number, })
  @Column()
  term_duration: number;

  @ApiProperty({ enum: () => PaymentFrequencies, })
  @Column({ type: 'enum', enum: PaymentFrequencies, })
  term_frequency: PaymentFrequencies;

  @ApiProperty({ type: Number, })
  @Column('decimal', { scale: 2 })
  total_interest: number

  @ApiProperty({ type: Number, })
  @Column('decimal', { scale: 2 })
  total_loan: number;

  @ApiProperty({ type: Number, })
  @Column('decimal', { scale: 2 })
  monthly_interest: number;

  @ApiProperty({ type: Number, })
  @Column('decimal', { scale: 2 })
  monthly_payment: number;

  @ApiProperty({ type: Number, })
  @Column('decimal', { scale: 2 })
  monthly_fee: number;

  @ApiProperty({ type: Boolean, })
  @Column()
  approval: boolean;

  @ApiProperty({ type: Number, })
  @Column('decimal', { scale: 2 })
  current_balance: number;

  @ApiProperty({ type: Date, })
  @Column()
  created: Date;

  @ApiProperty({ type: Date, })
  @Column({ nullable: true })
  modified: Date;
}