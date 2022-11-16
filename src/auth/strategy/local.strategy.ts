import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CredientialUserDto } from 'src/user/dto/credientialuser.dto';
import { User } from 'src/user/entity/user.entity';
import { AuthService } from '../auth.service';

export class LocalStategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(validateInput: CredientialUserDto): Promise<User> {
    return await this.authService.signin(validateInput);
  }
}
