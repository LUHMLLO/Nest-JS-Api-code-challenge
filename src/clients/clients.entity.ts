/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
} from 'typeorm'
import { UsersEntity } from 'src/users/users.entity'
import { LoansEntity } from 'src/loans/loans.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity( 'clientes' )
export class ClientsEntity {
    @ApiProperty( { type: BigInt } )
    @PrimaryGeneratedColumn( { type: 'bigint' } )
    id: number

    @ApiProperty( { type: () => UsersEntity } )
    @OneToOne( () => UsersEntity, ( user ) => user.client )
    user: UsersEntity

    @ApiProperty( { type: () => [ LoansEntity ] } )
    @OneToMany( () => LoansEntity, ( loan ) => loan.client )
    loans: LoansEntity[]

    @ApiProperty( { type: String } )
    @Column( { unique: true } )
    identification: string

    @ApiProperty( { type: String } )
    @Column()
    first_name: string

    @ApiProperty( { type: String } )
    @Column()
    last_name: string

    @ApiProperty( { type: String } )
    @Column( { unique: true } )
    email: string

    @ApiProperty( { type: String } )
    @Column( { unique: true } )
    phone: string

    @ApiProperty( { type: Date } )
    @Column()
    created: Date

    @ApiProperty( { type: Date } )
    @Column( { nullable: true } )
    modified: Date
}
