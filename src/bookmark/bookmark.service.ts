import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookMarkDto, EditBookMarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {

    constructor(private prisma: PrismaService){}

    createBookMark(userId: number, dto:CreateBookMarkDto){
        return this.prisma.bookmark.create({data: {...dto,userId}})
    }

    getBookmarks(userId: number){
        return this.prisma.bookmark.findMany({where : {userId: userId}})
    }

    getBookMarkById(userId: number, bookMarkId: number){
        return this.prisma.bookmark.findFirst({where: {id: bookMarkId, userId}})
    }

    async editBookMarkById(userId: number, bookMarkId: number, dto: EditBookMarkDto){
        const bookMark = await this.prisma.bookmark.findUnique({where:{id: bookMarkId}});
        if(!bookMark || bookMark.userId !== userId) throw new ForbiddenException('Access to resource denied.');
        return this.prisma.bookmark.update({where:{id: bookMarkId}, data: dto})
    }

    async deleteBookMark(userId: number, bookMarkId: number){
        const bookMark = await this.prisma.bookmark.findUnique({where:{id: bookMarkId}});
        if(!bookMark || bookMark.userId !== userId) throw new ForbiddenException('Access to resource denied.');
        await this.prisma.bookmark.delete({where:{id: bookMarkId}});
    }
}
