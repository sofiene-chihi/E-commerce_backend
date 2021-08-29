import { Field, Float, InputType } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, IsBase64, IsNumber } from 'class-validator';

@InputType()
export class CreateProductInput {

  @IsAlphanumeric()
  @Field()
  name: string;

  @IsAlpha()
  @Field()
  category: string;

  @IsBase64()
  @Field({ nullable: true })
  img: string;

  @IsNumber()
  @Field(() => Float)
  price: number;

  @IsAlpha()
  @Field()
  mark: string;

  @IsAlphanumeric()
  @Field({ nullable: true })
  description?: string;
}
