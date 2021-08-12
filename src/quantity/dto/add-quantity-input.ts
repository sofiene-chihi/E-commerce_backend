import { Field,InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class AddQuantityInput {

    @IsNumber()
    @Field(()=>Int)
    commandId: number;

    @IsNumber()
    @Field(()=>Int)
    productId: number;

    @IsNumber()
    @Field(()=>Int)
    value: number;
}
