import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";



export class CreateOrderProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    productId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    orderId:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    totalPrice:number;
}
