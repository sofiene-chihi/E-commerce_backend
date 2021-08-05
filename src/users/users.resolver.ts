import { Resolver ,Query, Mutation, Args } from '@nestjs/graphql';
import { RegisterUserInput } from './dto/register-user-input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(()=>User)
export class UsersResolver {


    constructor(private usersService: UsersService){}

    @Query(()=>[User])
    products(): Promise<User[]> {
            return this.usersService.findAll();
        }

    @Mutation(returns => User)
    createProduct(@Args('registerUserInput') registerUserInput: RegisterUserInput): Promise<User> {
        return this.usersService.registerUser(registerUserInput);
    }

}

