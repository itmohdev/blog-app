import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongoosdriverModule } from './databases/mongoosdriver/mongoosdriver.module';
import { TypeormdriverModule } from './databases/typeormdriver/typeormdriver.module';

@Module({
  imports: [UserModule, MongoosdriverModule, TypeormdriverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
