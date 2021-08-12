import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('address')
@ObjectType()
export class Address {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  state: string;

  @Column()
  @Field()
  delegation: string;


  @Column('float', { default: 0 })
  @Field(() => Float)
  height: number;

  @Column('float', { default: 0 })
  @Field(() => Float)
  width: number;

  @OneToOne(() => User, user => user.address) // specify inverse side as a second parameter
  @Field(() => User, {nullable:true})
  user: User;
}