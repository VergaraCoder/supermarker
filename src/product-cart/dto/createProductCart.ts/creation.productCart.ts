import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { ProductCartDto } from "../create-product-cart.dto";


export class createProductCartDto{
    @ApiProperty()
    @IsNotEmpty()
    @Type(()=>ProductCartDto)
    productCart:ProductCartDto[]
}