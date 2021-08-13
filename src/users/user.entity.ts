import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Address } from "src/address/address.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

   
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    public createdAt: Date;
  
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;


    @OneToOne(() => Address, address => address.user, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    @Field(() => Address)
    address: Address;   

}