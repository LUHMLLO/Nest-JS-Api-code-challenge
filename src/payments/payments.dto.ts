import { ApiProperty } from "@nestjs/swagger";
import { LoansEntity } from "src/loans/loans.entity";

export class PaymentsDTO {
    @ApiProperty({
        type: BigInt
    })
    id: number;

    @ApiProperty({ type: LoansEntity, })
    loan: LoansEntity;

    @ApiProperty({ type: Date, })
    created: Date;

    @ApiProperty({ type: Date, })
    modified: Date;
}