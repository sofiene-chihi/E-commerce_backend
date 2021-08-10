import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsNumber } from 'class-validator';

@InputType()
export class CreateAddressInput {

    @IsAlpha()
    @Field({nullable:true})
    state: string;
  
    @IsAlpha()
    @Field({nullable:true})
    delegation: string;
  
    @IsNumber()
    @Field(() => Float, {nullable:true})
    height: number;

    @IsNumber()
    @Field(() => Float, {nullable:true})
    width: number;
}
