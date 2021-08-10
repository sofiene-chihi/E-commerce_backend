import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsAlpha, IsNumber } from 'class-validator';

@InputType()
export class UpdateAddressInput {

    @IsNumber()
    @Field(() => Int)
    id: number;
  
    @IsAlpha()
    @Field()
    state: string;
  
    @IsAlpha()
    @Field()
    delegation: string;
  
    @IsNumber()
    @Field(() => Float)
    height: number;
  
    @IsNumber()
    @Field(() => Float)
    width: number;
}
