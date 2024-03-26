import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signUp() {
    return { data: ' I have sign up' };
  }

  logIn() {
    return { data: 'I have log in' };
  }
}
