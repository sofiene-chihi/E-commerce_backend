import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { env } from 'process';
require("dotenv").config();

@Module({
  imports: [UsersModule, PassportModule,
    JwtModule.register({
    secret: env.SECRET,
    signOptions: { expiresIn: '3600s' },
  }),],
  providers: [AuthService, AuthResolver,JwtStrategy],
})
export class AuthModule {}
