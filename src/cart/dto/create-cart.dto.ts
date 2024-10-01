import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId:string;
}
