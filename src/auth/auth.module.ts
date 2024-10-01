import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { localGuard } from './jwt/guard/local.guard';
import { jwtGuard } from './jwt/guard/jwt.guard';
import { RoleModule } from 'src/role/role.module';
//import { jwtStrategy } from './jwt/strategy/jwt.strategy';
import { localStrategy } from './jwt/strategy/local.strategy';

@Module({
  imports:[
    PassportModule,
    forwardRef(()=>UserModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    localStrategy,
    localGuard,
    jwtGuard,
  ],
  exports:[JwtModule]
})
export class AuthModule {}
