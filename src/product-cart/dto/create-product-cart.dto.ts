import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class ProductCartDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    productId:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity:number;

}
