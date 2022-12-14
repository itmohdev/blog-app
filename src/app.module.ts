import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongoosdriverModule } from './databases/mongoosdriver/mongoosdriver.module';
import { TypeormdriverModule } from './databases/typeormdriver/typeormdriver.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import * as joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validationSchema: joi.object({
        MONGODB_URI: joi.string().required(),
        MSSQLDB_USERNAME: joi.string().required(),
        MSSQLDB_PASSWORD: joi.string().required(),
        MSSQLDB_NAME: joi.string().required(),
        MSSQLDB_HOST: joi.string().required(),
        MSSQLDB_PORT: joi.number().required(),
        APP_PORT: joi.number().required(),
        APP_SECRETKEY: joi.string().required(),
        APP_EXPIREATION: joi.number().required(),
      }),
    }),
    UserModule,
    MongoosdriverModule,
    TypeormdriverModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
