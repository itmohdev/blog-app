import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CredientialUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}