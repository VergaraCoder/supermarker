import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    role:string;
}
