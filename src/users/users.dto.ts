/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { ClientsEntity } from 'src/clients/clients.entity'
import { AuthRoles } from 'src/utils.enums'

export class UsersDTO {
    @ApiProperty( { type: BigInt } )
    id: number

    @ApiProperty( { type: () => ClientsEntity } )
    client: ClientsEntity

    @ApiProperty( { type: String } )
    avatar: string

    @ApiProperty( { type: String } )
    username: string

    @ApiProperty( { type: String } )
    password: string

    @ApiProperty( { enum: () => AuthRoles } )
    role: AuthRoles

    @ApiProperty( { type: Date } )
    created: Date

    @ApiProperty( { type: Date } )
    modified: Date

    @ApiProperty( { type: Date } )
    accessed: Date
}

export class CreateUsersDTO {
    @ApiProperty( { type: Number } )
    clientID: number

    @ApiProperty( { type: String } )
    avatar: string

    @ApiProperty( { type: String } )
    username: string

    @ApiProperty( { type: String } )
    password: string

    @ApiProperty( { enum: () => AuthRoles } )
    role: AuthRoles
}
