import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateAuthDto {
    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    password:string;
}
