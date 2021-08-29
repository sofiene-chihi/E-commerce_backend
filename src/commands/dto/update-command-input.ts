import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateCommandInput } from './create-command-input';

@InputType()
export class UpdateCommandInput extends PartialType(CreateCommandInput) {
  @Field()
  id: number;

  @IsNumber()
  @Field(() => Float, { nullable: true })
  purshase_cost?: number;

  @IsNumber()
  @Field({ nullable: true })
  status?: string;
}
