/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaymentsEntity } from './payments.entity'
import { LoansEntity } from 'src/loans/loans.entity'
import { CreatePaymentsDTO, PaymentsDTO } from './payments.dto'
import { ClientsEntity } from 'src/clients/clients.entity'

@Injectable()
export class PaymentsService {
    constructor (
        @InjectRepository( PaymentsEntity )
        private readonly paymentsRepo: Repository<PaymentsEntity>,

        @InjectRepository( LoansEntity )
        private readonly loansRepo: Repository<LoansEntity>,

        @InjectRepository( ClientsEntity )
        private readonly clientsRepo: Repository<ClientsEntity>
    ) { }

    async all(): Promise<PaymentsEntity[]> {
        return this.paymentsRepo.find()
    }

    async create( dto: CreatePaymentsDTO ): Promise<PaymentsEntity | string> {
        const target = await this.loansRepo.findOne( { where: { id: dto.loanID } } )

        if ( !target ) {
            return JSON.stringify( 'loan not found' )
        }

        if ( target.current_balance == 0 ) {
            return JSON.stringify( 'loan already paid off' )
        }

        const payment = new PaymentsEntity()

        payment.loan = target

        payment.initial_balance = target.current_balance
        payment.issued_payment = dto.payment
        payment.final_balance = Math.round( target.current_balance - dto.payment )

        payment.created = new Date()

        this.paymentsRepo.save( payment )

        target.current_balance = payment.final_balance
        target.modified = new Date()

        this.loansRepo.update( target.id, target )

        return payment
    }

    async read( id: number ): Promise<PaymentsEntity | string> {
        const target = await this.paymentsRepo.findOneBy( { id } )

        if ( !target ) {
            return JSON.stringify( 'loan not found' )
        }

        return target
    }

    async readLoanBalance( id: number ): Promise<string> {
        const target = await this.loansRepo.findOneBy( { id: id } )

        if ( !target ) {
            return JSON.stringify( 'loan not found' )
        }

        return JSON.stringify( `loan current balance: ${ target.current_balance }` )
    }

    async readclientBalancePerLoan( id: number ): Promise<string[] | string> {
        const target = await this.clientsRepo.findOneBy( { id: id } )

        if ( !target ) {
            return JSON.stringify( 'client not found' )
        }

        const loans = await this.loansRepo.find()
        const balances = Array<string>()

        for ( const loan of loans ) {
            balances.push( `loan ${ loan.id } balance: ${ loan.current_balance }` )
        }

        return balances
    }

    async update( id: number, dto: PaymentsDTO ): Promise<string> {
        const target = await this.paymentsRepo.findOne( { where: { id: id } } )

        if ( !target ) {
            return JSON.stringify( 'loan not found' )
        }

        dto.modified = new Date()

        await this.paymentsRepo.update( id, dto )

        return 'payment updated'
    }

    async delete( id: number ): Promise<string> {
        const target = await this.paymentsRepo.findOne( { where: { id: id } } )

        if ( !target ) {
            return JSON.stringify( 'loan not found' )
        }

        await this.paymentsRepo.delete( id )

        return JSON.stringify( `loan '#${ target.id }' deleted` )
    }
}
