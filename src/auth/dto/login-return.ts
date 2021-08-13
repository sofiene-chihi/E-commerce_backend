import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';

@ObjectType()
export class LoginReturn {
  @Field()
  user: User;

  @Field()
  Bearer_Token: string;
}
