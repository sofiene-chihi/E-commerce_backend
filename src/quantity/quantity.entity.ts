import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Address } from "src/address/address.entity";
import { Command } from "src/commands/command.entity";
import { Product } from "src/products/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@ObjectType()
export class Quantity{
    
    
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @ManyToOne(type => Product, product => product.quantities, {
        primary: true, 
        cascade: true,
        eager: true
    }) 
    @JoinColumn()
    product?: Product;

    @ManyToOne(type => Command, command => command.quantities, { 
        primary: true, 
        cascade: true,
        eager: true })
    @JoinColumn()
    command?: Command;

    @Column()
    @Field(()=>Int)
    productId: number;
    
    @Column()
    @Field(()=>Int)
    commandId: number;

    @Column()
    @Field(()=>Int)
    value: number;


}