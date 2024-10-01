import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seederUser } from './common/dataBase/seeders/user/user.seeder';
import { seederRole } from './common/dataBase/seeders/role/role.seeder';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { exceptionErrors } from './common/erros/exceptionFilter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource=app.get(DataSource);
  const configService=app.get(ConfigService);
  const seederRoles= new seederRole();
  const seederUsers=new seederUser();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new exceptionErrors());

  app.use(cookieParser(configService.get<string>("SIGNED_COOKIE")));
  await seederRoles.run(dataSource);
  await seederUsers.run(dataSource);
  await app.listen(3000);
}
bootstrap();
