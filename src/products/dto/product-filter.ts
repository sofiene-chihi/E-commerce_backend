import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, IsNumber } from 'class-validator';
import { PriceRange } from './price-range';

@InputType()
export class ProductFilter {

    @IsAlpha()
    @Field({nullable: true})
    category: string;
  
    @Field(() => PriceRange, {nullable: true})
    priceRange: PriceRange;
  
    @IsAlpha()
    @Field({nullable: true})
    mark: string;

}
