import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CredientialUserDto } from 'src/user/dto/credientialuser.dto';
import { User } from 'src/user/entity/user.entity';
import { AuthService } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "THyussadnmadKHSJNUNnONoUN89NU9N9",
    });
  }

  async validate({ username, password }: CredientialUserDto): Promise<User> {
    const user = await this.authService.signin({ username, password });
    if (!user) {
      throw new HttpException('error in crediential', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
