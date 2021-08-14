import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Quantity } from 'src/quantity/quantity.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
  public createdAt: Date;


  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;

  @OneToMany(type => Quantity, quantity => quantity.command)
  quantities: Quantity[];

}
