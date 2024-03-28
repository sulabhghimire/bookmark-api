import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateBookMarkDto {

    @ApiProperty({
        description: 'Title of the Bookmark',
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        description: 'Description of the Bookmark',
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({
        description: 'Link of the bookmark',
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    link: string

}