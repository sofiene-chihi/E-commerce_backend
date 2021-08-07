import { Field, Float, InputType, Int, ObjectType } from "@nestjs/graphql";
import {IsEmail } from "class-validator";
import { isOutputType } from "graphql";
import { User } from "src/users/user.entity";


@ObjectType()
export class LoginReturn{
    
    @Field()
    user: User;

    @Field()
    Bearer_Token: string;
}