/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ClientsDTO, CreateClientsDTO } from './clients.dto'
import { ClientsEntity } from './clients.entity'

@Injectable()
export class ClientsService {
    constructor (
        @InjectRepository( ClientsEntity )
        private readonly clientsRepo: Repository<ClientsEntity>
    ) { }

    async allClientsOnly(): Promise<ClientsEntity[]> {
        return this.clientsRepo.find()
    }

    async allClientsUsers(): Promise<ClientsEntity[]> {
        return this.clientsRepo.find( {
            relations: [ 'user' ],
        } )
    }

    async allClientsLoans(): Promise<ClientsEntity[]> {
        return this.clientsRepo.find( {
            relations: [ 'loans' ],
        } )
    }

    async allClientsDetails(): Promise<ClientsEntity[]> {
        return this.clientsRepo.find( {
            relations: [ 'user', 'loans' ],
        } )
    }

    async create( dto: CreateClientsDTO ): Promise<ClientsEntity | string> {
        const isIdentification = await this.clientsRepo.findOne( {
            where: { identification: dto.identification },
        } )
        const isEmail = await this.clientsRepo.findOne( {
            where: { email: dto.email },
        } )
        const isPhone = await this.clientsRepo.findOne( {
            where: { phone: dto.phone },
        } )

        if ( isIdentification ) {
            return JSON.stringify( 'client already exists' )
        }

        if ( isEmail ) {
            return JSON.stringify( 'email already in use' )
        }

        if ( isPhone ) {
            return JSON.stringify( 'phone already in use' )
        }

        const client = new ClientsEntity()

        client.identification = dto.identification
        client.first_name = dto.first_name
        client.last_name = dto.last_name
        client.email = dto.email
        client.phone = dto.phone
        client.created = new Date()

        return this.clientsRepo.save( client )
    }

    async read( id: number ): Promise<ClientsEntity | string> {
        const target = await this.clientsRepo.findOne( { where: { id: id } } )

        if ( !target ) {
            return JSON.stringify( 'client not found' )
        }

        return target
    }

    async update( id: number, dto: ClientsDTO ): Promise<string> {
        const target = await this.clientsRepo.findOne( { where: { id: id } } )

        if ( !target ) {
            return JSON.stringify( 'client not found' )
        }

        dto.modified = new Date()

        await this.clientsRepo.update( id, dto )

        return 'client updated'
    }

    async delete( id: number ): Promise<string> {
        const target = await this.clientsRepo.findOne( { where: { id: id } } )

        if ( !target ) {
            return JSON.stringify( 'client not found' )
        }

        await this.clientsRepo.delete( id )

        return JSON.stringify(
            `client '${ target.first_name } ${ target.last_name }' deleted`
        )
    }
}
