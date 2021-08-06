import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserInput } from 'src/users/dto/register-user-input';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginInput } from 'src/users/dto/login-input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

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

  async login(loginInput: LoginInput) {
    const user: LoginInput= await this.usersService.findOne(loginInput.email);
      if( !user ){
          throw new NotFoundException("User not found !")
      }
      if(!(await bcrypt.compare(loginInput.password, user.password))){
          throw new BadRequestException( "Password invalid !");
      }
      const jwt= this.jwtService.signAsync({email: user.email})
      return {
        user : user,
        Bearer_Token : (await jwt).toString()
      };
  }

}
