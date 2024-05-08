/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { LoansEntity } from 'src/loans/loans.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity( 'pagos' )
export class PaymentsEntity {
    @ApiProperty( { type: BigInt } )
    @PrimaryGeneratedColumn( { type: 'bigint' } )
    id: number

    @ApiProperty( { type: () => LoansEntity } )
    @ManyToOne( () => LoansEntity, ( loan ) => loan.payments )
    @JoinColumn( { name: 'loan_id' } )
    loan: LoansEntity

    @ApiProperty( { type: Number } )
    @Column( 'decimal', { scale: 2 } )
    initial_balance: number

    @ApiProperty( { type: Number } )
    @Column( 'decimal', { scale: 2 } )
    issued_payment: number

    @ApiProperty( { type: Number } )
    @Column( 'decimal', { scale: 2 } )
    final_balance: number

    @ApiProperty( { type: Date } )
    @Column()
    created: Date

    @ApiProperty( { type: Date } )
    @Column( { nullable: true } )
    modified: Date
}
