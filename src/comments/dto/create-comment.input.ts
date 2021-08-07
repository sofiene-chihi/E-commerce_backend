import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  sentence: string;

  @Field(() => Int)
  productId: number;
}
