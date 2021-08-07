import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class User{

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id:number;

    @Column()
    @Field()
    name: string;
    
    @Column()
    @Field()
    email: string;

    @Column()
    @Field(()=>Int)
    phone_number: number;

    @Column()
    @Field()
    password: string;

}