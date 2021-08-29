import { Req, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { RegisterUserInput } from 'src/users/dto/register-user-input';
import { AuthService } from './auth.service';
import { LoginInput } from 'src/users/dto/login-input';
import { LoginReturn } from './dto/login-return';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  register(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
    return this.authService.register(registerUserInput);
  }

  @Mutation(() => LoginReturn)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
