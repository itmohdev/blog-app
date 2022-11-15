import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongoosdriverModule } from './databases/mongoosdriver/mongoosdriver.module';
import { TypeormdriverModule } from './databases/typeormdriver/typeormdriver.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        MONGODB_URI: joi.string().required(),
        MSSQLDB_USERNAME: joi.string().required(),
        MSSQLDB_PASSWORD: joi.string().required(),
        MSSQLDB_NAME: joi.string().required(),
        MSSQLDB_HOST: joi.string().required(),
        MSSQLDB_PORT: joi.number().required(),
        APP_PORT: joi.number().required(),
      }),
    }),
    UserModule,
    MongoosdriverModule,
    TypeormdriverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
