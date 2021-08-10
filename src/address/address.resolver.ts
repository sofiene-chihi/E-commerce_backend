import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Address } from './address.entity';
import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/create-address-input';
import { UpdateAddressInput } from './dto/update-address-input';

@Resolver(()=> Address)
export class AddressResolver {

    constructor(private addressService: AddressService) {}

    @Query(() => [Address])
    addresses(): Promise<Address[]> {
      return this.addressService.findAll();
    }
  
    @Query(() => Address)
    getAddress(@Args('id', { type: () => Int }) id: number): Promise<Address> {
      return this.addressService.findOne(id);
    }
  
    @Mutation(() => Address)
    createAddress(
      @Args('createAddressInput') createAddressInput: CreateAddressInput,
    ): Promise<Address> {
      return this.addressService.createAddress(createAddressInput);
    }
  
    @Mutation(() => Address)
    updateAddress(
      @Args('updateAddressInput') updateAddressInput: UpdateAddressInput,
    ): Promise<Address> {
      return this.addressService.updateAddress(updateAddressInput);
    }
  
    @Mutation(() => Address)
    deleteAddress(@Args('id', { type: () => Int }) id: number): Promise<Address> {
      return this.addressService.deleteAddress(id);
    }


}
