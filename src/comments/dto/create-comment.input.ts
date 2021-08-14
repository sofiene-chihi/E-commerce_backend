import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateCommentInput {
  
  @Field()
  sentence: string;

  @Field(() => Int)
  productId: number;
}
