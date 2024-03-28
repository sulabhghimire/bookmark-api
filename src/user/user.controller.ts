import { Body, Controller, Get, Patch, UseGuards, Version } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users API')
@UseGuards(JwtGuard)
@Controller({
  path:'users',
  version: '1'
})
@ApiBearerAuth()
export class UserController {

  constructor(private userService: UserService){}

  @Get('me')
  getMe(@GetUser() user:User) {
    return user;
  }


  @Patch()
  editUser(@Body() dto:EditUserDto, @GetUser('id') userId: number){
    return this.userService.editUser(userId, dto);
  }

}
