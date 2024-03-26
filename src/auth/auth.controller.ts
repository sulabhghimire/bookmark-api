import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp() {
    this.authService.signUp();
  }

  @Post('login')
  logIn() {
    this.authService.logIn();
  }
}
