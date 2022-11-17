import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mssql',
  host: configService.get('MSSQLDB_HOST'),
  port: configService.get('MSSQLDB_PORT'),
  database: configService.get('MSSQLDB_NAME'),
  username: configService.get('MSSQLDB_USERNAME'),
  password: configService.get('MSSQLDB_PASSWORD'),
  entities: ['dist/**/entity/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
});
