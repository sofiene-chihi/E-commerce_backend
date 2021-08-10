import { Field, Float, InputType, Int } from "@nestjs/graphql";
import {  IsAlpha, IsAlphanumeric, IsNumber, IsEmail } from "class-validator";
import { type } from "os";
import { Address } from "src/address/address.entity";
import { CreateAddressInput } from "src/address/dto/create-address-input";

@InputType()
export class RegisterUserInput{

    @IsAlpha()
    @Field()
    name: string;
    
    @IsEmail()
    @Field()
    email: string;

    @IsNumber()
    @Field(()=>Int)
    phone_number: number;

    @Field()
    password: string;

    // @Field(()=> CreateAddressInput,{nullable:true})
    // address: Address


}