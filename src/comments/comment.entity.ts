import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../products/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  sentence: string;

  @Column()
  @Field(() => Int)
  productId: number;

  @ManyToOne(() => Product, (product) => product.comments)
  @Field(() => Product, { nullable: true })
  product?: Product;
}
