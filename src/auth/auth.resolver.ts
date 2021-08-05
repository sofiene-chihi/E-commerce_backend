import { Req, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express';
import { RegisterUserInput } from 'src/users/dto/register-user-input';
import { AuthService } from './auth.service';

@Resolver(()=>User)
export class AuthResolver {

    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Mutation(() => User)
    async login(@Req() req) {
        return req.user;
      }

    @Mutation(() => User)
    register(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
        return this.authService.register(registerUserInput);
    }
}
