import { Field, Float, InputType, Int } from "@nestjs/graphql";
import {  IsAlpha, IsAlphanumeric, IsNumber } from "class-validator";

@InputType()
export class CreateProductInput{

    @Field()
    name: string;
    
    @IsAlpha()
    @Field()
    category: string;

    @Field({nullable: true})
    img: string;

    @IsNumber()
    @Field(() => Float)
    price: number;

    @Field()
    mark: string;

    @IsAlphanumeric()
    @Field({nullable: true})
    description?: string;
}