import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Address } from "src/address/address.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


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


    @OneToOne(() => Address, address => address.user, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    @Field(() => Address)
    address: Address;   

}