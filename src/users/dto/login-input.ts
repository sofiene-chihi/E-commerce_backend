import { Field, Float, InputType, Int } from "@nestjs/graphql";
import {IsEmail } from "class-validator";

@InputType()
export class LoginInput{
    
    @IsEmail()
    @Field()
    email: string;

    @Field()
    password: string;
}