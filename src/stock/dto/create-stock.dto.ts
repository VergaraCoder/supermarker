import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";


export class CreateStockDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    weighing:string;

    @ApiProperty()
    @IsNotEmpty()
    quantity:number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    productId:number;
}
