import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator';
import { CreateBookMarkDto, EditBookMarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private bookMarkService: BookmarkService){}

    @Post()
    createBookMark(@GetUser('id') userId: number, @Body() dto: CreateBookMarkDto){
        return this.bookMarkService.createBookMark(userId, dto);
    }

    @Get()
    getBookmarks(@GetUser('id') userId: number){
        return this.bookMarkService.getBookmarks(userId);
    }

    @Get(':id')
    getBookMarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookMarkId: number){
        return this.bookMarkService.getBookMarkById(userId, bookMarkId);
    }

    @Patch(':id')
    editBookMarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookMarkId: number, @Body() dto: EditBookMarkDto){
        return this.bookMarkService.editBookMarkById(userId, bookMarkId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookMark(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookMarkId: number){
        return this.bookMarkService.deleteBookMark(userId, bookMarkId);
    }


}
