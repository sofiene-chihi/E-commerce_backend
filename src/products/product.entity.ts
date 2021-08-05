import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Command } from 'src/commands/command.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToMany(() => Command, (command) => command.products)
  commands: Command[];
}
