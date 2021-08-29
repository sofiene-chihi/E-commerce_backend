import { Field,InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class AddQuantityInput {

    @Field(()=>Int)
    commandId: number;

    @Field(()=>Int)
    productId: number;

    @IsNumber()
    @Field(()=>Int)
    value: number;
}
