import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports:[
    RoleModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
