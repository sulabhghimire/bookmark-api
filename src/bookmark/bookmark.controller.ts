import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookMarkDto, EditBookMarkDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Bookmarks API')
@UseGuards(JwtGuard)
@Controller({
    path:'bookmarks',
    version: '1'
})
@ApiBearerAuth()
export class BookmarkController {

    private readonly logger = new Logger(BookmarkController.name);

    constructor(private bookMarkService: BookmarkService){}

    @Post()
    createBookMark(@GetUser('id') userId: number, @Body() dto: CreateBookMarkDto){
        this.logger.verbose(`User "${userId}" creating a new bookmark. Bookmark Data:${JSON.stringify(dto)}`);
        return this.bookMarkService.createBookMark(userId, dto);
    }

    @Get()
    getBookmarks(@GetUser('id') userId: number){
        this.logger.verbose(`User "${userId}" getting all bookmarks related to itself.`);
        return this.bookMarkService.getBookmarks(userId);
    }

    @Get(':id')
    getBookMarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookMarkId: number){
        this.logger.verbose(`User "${userId}" getting bookmark of id ${bookMarkId}.`);
        return this.bookMarkService.getBookMarkById(userId, bookMarkId);
    }

    @Patch(':id')
    editBookMarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookMarkId: number, @Body() dto: EditBookMarkDto){
        this.logger.verbose(`User "${userId}" editing bookmark of id ${bookMarkId}. Editable Data:${JSON.stringify(dto)}`);
        return this.bookMarkService.editBookMarkById(userId, bookMarkId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookMark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookMarkId: number){
        this.logger.verbose(`User "${userId}" deleting bookmark of id ${bookMarkId}.`);
        return this.bookMarkService.deleteBookMark(userId, bookMarkId);
    }


}
