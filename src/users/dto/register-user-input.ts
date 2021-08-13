import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsNumber, IsEmail } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @IsAlpha()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsNumber()
  @Field(() => Int)
  phone_number: number;

  @Field()
  password: string;

  @Field(() => Int)
  roleId: number;
}
