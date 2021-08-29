import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class SelectedProducts {
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsNumber()
  @Field(() => Int)
  quantity: number;

  @IsNumber()
  @Field(() => Float)
  price: number;
}
