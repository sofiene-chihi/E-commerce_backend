import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserInput } from 'src/users/dto/register-user-input';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async register(registerUserInput: RegisterUserInput) : Promise<User>{

    let foundOwner = await this.usersService.findOne(registerUserInput.email);
    if (foundOwner){
      throw new BadRequestException('Email is already in use');
    }
    const hashed = await bcrypt.hash(registerUserInput.password,8);
    registerUserInput.password = hashed;
    await this.usersService.registerUser(registerUserInput);
    return await this.usersService.findOne(registerUserInput.email)
  }

}
