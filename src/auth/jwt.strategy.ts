import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { env } from 'process';
import { PayloadInterface } from './interfaces/payload.interface';
import { UsersService } from 'src/users/users.service';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.SECRET,
    });
  }

  async validate(payload: PayloadInterface) {
    console.log("payload is , " ,payload);
    const user = await this.usersService.getUser(payload.sub);
    if (user) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
