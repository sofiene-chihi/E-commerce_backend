import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsNumber } from 'class-validator';

@InputType()
export class CreateCommandInput {
  @IsAlpha()
  @Field()
  payment_mode: string;

  @IsNumber()
  @Field(() => Float)
  shipping_cost: number;

  @IsNumber()
  @Field(() => Float)
  purshase_cost: number;

  @IsNumber()
  @Field(() => Int)
  status: number;
}
