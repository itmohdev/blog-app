import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get("MSSQLDB_HOST"),
        username: configService.get("MSSQLDB_USERNAME"),
        password: configService.get("MSSQLDB_PASSWORD"),
        database: configService.get("MSSQLDB_NAME"),
        entities: ['src/**/**/*.entity.{ts, js}'],
        synchronize: true,
        logging: true,
        port: configService.get("MSSQLDB_PORT"),
        extra: {},
      }),
    }),
  ],
})
export class TypeormdriverModule {}
