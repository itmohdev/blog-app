import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createuser.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/signup")
  async register(@Body() registerInput: CreateUserDto) {
    return this.authService.signup(registerInput);
  }

  @Post("/signin")
  async login(@Body() registerInput: CreateUserDto) {
    return this.authService.signin(registerInput);
  }
}
