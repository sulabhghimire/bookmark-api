import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString } from "class-validator"

export class EditUserDto{
    @ApiProperty({
        required: false,
        description: "To be changed email - must be unique",
        type: String
    })
    @IsEmail()
    @IsOptional()
    email?: string

    @ApiProperty({
        required: false,
        description: "User's first name",
        type: String
    })
    @IsString()
    @IsOptional()
    firstName?: string

    @ApiProperty({
        required: false,
        description: "Users last name",
        type: String
    })
    @IsString()
    @IsOptional()
    lastName?: string
}