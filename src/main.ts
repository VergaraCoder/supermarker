import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seederUser } from './common/dataBase/seeders/user/user.seeder';
import { seederRole } from './common/dataBase/seeders/role/role.seeder';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource=app.get(DataSource);
  const seederRoles= new seederRole();
  const seederUsers=new seederUser();

  app.useGlobalPipes(new ValidationPipe());

  await seederRoles.run(dataSource);
  await seederUsers.run(dataSource);
  await app.listen(3000);
}
bootstrap();
