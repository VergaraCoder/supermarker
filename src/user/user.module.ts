import { RoleService } from 'src/role/role.service';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleModule } from 'src/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FilterUserService } from './filterUser/filter.userService';
import { filterDataUpdate } from './returnDataUpdate/data.ok';
import { jwtGuard } from 'src/auth/jwt/guard/jwt.guard';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    RoleModule,
    forwardRef(()=>AuthModule)
  ],
  controllers: [UserController],
  providers: [
    UserService,
  FilterUserService,
  RoleService,
  filterDataUpdate,
],
  exports:[TypeOrmModule,UserService]
})
export class UserModule {}
