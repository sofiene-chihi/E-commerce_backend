import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserInput } from './dto/register-user-input';
import { Address } from 'src/address/address.entity';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository : Repository<User>,@InjectRepository(Address) private addressRepository : Repository<Address>) {}


    async registerUser(registerUserInput : RegisterUserInput): Promise<User> {

        registerUserInput.address = this.addressRepository.create(registerUserInput.address);
        
        const newUser = this.userRepository.create(registerUserInput);
        console.log(newUser)
        return await this.userRepository.save(newUser);
    }

    async findAll(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async findOne(email: string): Promise<User>{
        return await this.userRepository.findOne({email: email});
    }

    async deleteUser(email: string): Promise<User> {

        let user  = this.findOne(email);
        if ( await this.userRepository.delete((await user).id)){
            return user;
        }
        throw new BadRequestException("user not found !");
    }


    // async updateProduct(updateProductInput: UpdateProductInput) : Promise<Product> {

    //     let {id, name,category,img, price, mark, description} = updateProductInput;
    //     if( await this.userRepository.findOne(id) ) {
    //         await this.userRepository.update(id, {name,category,img,price,mark,description});
    //         return await this.userRepository.findOne(id);
    //     }

    //     throw new BadRequestException("product not found !")
        
    //   }

}

