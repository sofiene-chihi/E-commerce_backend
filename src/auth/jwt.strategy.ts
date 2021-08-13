import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { AuthService } from './auth.service';
import { AuthenticationError } from 'apollo-server-express';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.SECRET,
    });
  }

  // async validate(payload: any) {
  //   // This is called to validate the user in the token exists
  //   const user = await this.authService.validateJwtPayload(payload);
  //   console.log('here user is ', user);
  //   if (!user) {
  //     throw new AuthenticationError(
  //       'Could not log-in with the provided credentials',
  //     );
  //   }

  //   return user;
  // }
}
