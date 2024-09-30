import { RoleService } from 'src/role/role.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleModule } from 'src/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FilterUserService } from './filterUser/filter.userService';
import { filterDataUpdate } from './returnDataUpdate/data.ok';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    RoleModule
  ],
  controllers: [UserController],
  providers: [UserService,
  FilterUserService,
  RoleService,
  filterDataUpdate,
],
  exports:[TypeOrmModule]
})
export class UserModule {}
