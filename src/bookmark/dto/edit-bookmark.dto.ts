import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class EditBookMarkDto {
    @ApiProperty({
        description: 'Title of the Bookmark',
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    title?: string

    @ApiProperty({
        description: 'Description of the Bookmark',
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({
        description: 'Link of the Bookmark',
        type: String,
        required: false
    })
    @IsString()
    @IsOptional()
    link?: string

}