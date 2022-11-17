import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.stratgy';
import { PassportModule } from '@nestjs/passport';
import { LocalStategy } from './strategy/local.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.get("APP_SECRETKEY"),
      signOptions: {
        expiresIn: `${configService.get("APP_EXPIREATION")}d`
      }
    }),
    inject: [ConfigService]
  })],
  providers: [AuthService, JwtStrategy, LocalStategy],
  controllers: [AuthController]
})
export class AuthModule {}
