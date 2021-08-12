import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Command } from '../commands/command.entity';
import { Comment } from '../comments/comment.entity';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quantity } from 'src/quantity/quantity.entity';

@Entity('product')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  category: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  img: string;

  @Column('float')
  @Field(() => Float)
  price: number;

  @Column()
  @Field()
  mark: string;

  @Column('text', { nullable: true })
  @Field({ nullable: true })
  description?: string;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments?: Comment[];

  @OneToMany(type => Quantity, quantity => quantity.product)
  quantities: Quantity[];
}
