import { ApiProperty } from '@nestjs/swagger';
import { LoansEntity } from 'src/loans/loans.entity';
import { UsersEntity } from 'src/users/users.entity';
export class ClientsDTO {
    @ApiProperty({
        type: BigInt
    })
    id: number;

    @ApiProperty({ type: String, })
    identification: string;

    @ApiProperty({ type: String, })
    first_name: string;

    @ApiProperty({ type: String, })
    last_name: string;

    @ApiProperty({ type: String, })
    email: string;

    @ApiProperty({ type: String, })
    phone: string;

    @ApiProperty({ type: Date, })
    created: Date;

    @ApiProperty({ type: Date, })
    modified: Date;

    @ApiProperty({ type: UsersEntity, })
    user: UsersEntity;

    @ApiProperty({ type: [LoansEntity], })
    loans: [LoansEntity];
}
export class CreateClientsDTO {
    @ApiProperty({ type: String, })
    identification: string;

    @ApiProperty({ type: String, })
    first_name: string;

    @ApiProperty({ type: String, })
    last_name: string;

    @ApiProperty({ type: String, })
    email: string;

    @ApiProperty({ type: String, })
    phone: string;
}