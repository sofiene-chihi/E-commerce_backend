import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/product.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { commandStatus } from './enum/commandStatus.enum';

@Entity('command')
@ObjectType()
export class Command {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  payment_mode: string;

  @Column('float', { default: 0 })
  @Field(() => Float)
  shipping_cost: number;

  @Column({ default: 'sumbitted' })
  @Field()
  status: string;

  @Column('float', { default: 0 })
  @Field(() => Float)
  purshase_cost: number;

  @ManyToMany(() => Product, (product) => product.commands)
  @JoinTable({ name: 'Command_Product' })
  products: Product[];
}
