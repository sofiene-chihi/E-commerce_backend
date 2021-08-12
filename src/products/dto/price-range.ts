import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, IsNumber, IsPositive } from 'class-validator';

@InputType()
export class PriceRange {

    @IsPositive()
    @IsNumber()
    @Field(()=>Float)
    priceMin: number;

    @IsPositive()
    @IsNumber()
    @Field(()=>Float)
    priceMax: number;

}
