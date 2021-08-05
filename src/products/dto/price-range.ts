import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, IsNumber } from 'class-validator';

@InputType()
export class PriceRange {

    @IsNumber()
    @Field(()=>Float)
    priceMin: number;

    @IsNumber()
    @Field(()=>Float)
    priceMax: number;

}
