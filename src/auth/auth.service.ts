import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createuser.dto';
import { CredientialUserDto } from 'src/user/dto/credientialuser.dto';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}


  async signup(signupInput: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.createUser(signupInput);
      return user;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signin(signinInput: CredientialUserDto): Promise<User> {
    try {
      const user = await this.userService.credientialUser(signinInput);
      return user;
    } catch (error) {
      throw new HttpException(
        'error in handle data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createToken(user: User): Promise<string> {
    try {
      const payload = { email: user.username, id: user.id };
      const token = await this.jwtService.sign(payload);
      return token;
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
