import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/product.entity';
import { Quantity } from 'src/quantity/quantity.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('command')
@ObjectType()
export class Command {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({default : ""})
  @Field()
  payment_mode: string;

  @Column('float', { default: 0 })
  @Field(() => Float)
  shipping_cost: number;

  @Column({ default: 0 })
  @Field(() => Int)
  status: number;

  @Column('float', { default: 0 })
  @Field(() => Float)
  purshase_cost: number;


  @OneToMany(type => Quantity, quantity => quantity.command)
  quantities: Quantity[];

}
