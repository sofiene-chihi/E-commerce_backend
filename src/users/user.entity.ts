import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from 'src/roles/roles.entity';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field(() => Int)
  phone_number: number;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
