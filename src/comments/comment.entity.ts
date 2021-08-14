import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../products/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
  public createdAt: Date;


  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;


  @ManyToOne(() => Product, (product) => product.comments)
  @Field(() => Product, { nullable: true })
  product?: Product;
}
