import { Field, Float, InputType, Int } from "@nestjs/graphql";
import {  IsAlpha, IsAlphanumeric, IsNumber, IsPositive } from "class-validator";

@InputType()
export class UpdateProductInput{

    @Field(type => Int)
    id:number;

    @IsAlphanumeric()
    @Field()
    name: string;
    
    @IsAlpha()
    @Field()
    category: string;

    @Field({nullable: true})
    img: string;

    @IsPositive()
    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsAlpha()
    @Field()
    mark: string;

    @IsAlphanumeric()
    @Field({nullable: true})
    description?: string;
}