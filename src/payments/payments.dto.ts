import { ApiProperty } from "@nestjs/swagger";
import { LoansEntity } from "src/loans/loans.entity";

export class PaymentsDTO {
    @ApiProperty({ type: BigInt })
    id: number;

    @ApiProperty({ type: () => LoansEntity, })
    loan: LoansEntity;

    @ApiProperty({ type: Number, })
    initial_balance: number;

    @ApiProperty({ type: Number, })
    issued_payment: number;

    @ApiProperty({ type: Number, })
    final_balance: number;

    @ApiProperty({ type: Date, })
    created: Date;

    @ApiProperty({ type: Date, })
    modified: Date;
}

export class CreatePaymentsDTO {
    @ApiProperty({ type: Number, })
    loanID: number;

    @ApiProperty({ type: Number, })
    payment: number;
}