import { ApiProperty } from '@nestjs/swagger';
import { ClientsEntity } from 'src/clients/clients.entity';
import { LoansEntity } from './loans.entity';
import { PaymentFrequencies } from 'src/utils.enums';

export class LoansDTO {
    @ApiProperty({ type: BigInt })
    id: number;

    @ApiProperty({ type: () => ClientsEntity, })
    client: ClientsEntity;

    @ApiProperty({ type: () => [LoansEntity], })
    payments: [LoansEntity];

    @ApiProperty({ type: Number, })
    requested_amount: number;

    @ApiProperty({ type: Number, })
    interest_rate: number;

    @ApiProperty({ type: Number, })
    term_duration: number;

    @ApiProperty({ enum: () => PaymentFrequencies, })
    term_frequency: PaymentFrequencies;

    @ApiProperty({ type: Number, })
    total_interest: number;

    @ApiProperty({ type: Number, })
    total_loan: number;

    @ApiProperty({ type: Number, })
    monthly_interest: number;

    @ApiProperty({ type: Number, })
    monthly_payment: number;

    @ApiProperty({ type: Number, })
    monthly_fee: number;

    @ApiProperty({ type: Boolean, })
    approval: boolean;

    @ApiProperty({ type: Number, })
    current_balance: number;

    @ApiProperty({ type: Date, })
    created: Date;

    @ApiProperty({ type: Date, })
    modified: Date;
}
export class CreateLoansDTO {
    @ApiProperty({ type: Number, })
    clientID: number;

    @ApiProperty({ type: Number, })
    requested_amount: number;

    @ApiProperty({ type: Number, })
    interest_rate: number;

    @ApiProperty({ type: Number, })
    term_duration: number;

    @ApiProperty({ enum: () => PaymentFrequencies, })
    term_frequency: PaymentFrequencies;
}