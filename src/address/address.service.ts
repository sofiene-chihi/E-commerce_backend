import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressInput } from './dto/create-address-input';
import { UpdateAddressInput } from './dto/update-address-input';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  findOne(id: number): Promise<Address> {
    return this.addressRepository.findOne(id);
  }

  createAddress(createAddressInput: CreateAddressInput): Promise<Address> {
    const newAddress = this.addressRepository.create(createAddressInput);
    return this.addressRepository.save(newAddress);
  }

  async updateAddress(
    updateAddressInput: UpdateAddressInput,
  ): Promise<Address> {
    const { id, ...input } = updateAddressInput;
    await this.addressRepository.update(id, input);
    return await this.addressRepository.findOne(id);
  }

  async deleteAddress(id: number): Promise<Address> {
    const foundAddress = this.findOne(id);
    if (foundAddress) {
      const result = await this.addressRepository.delete(id);
      if (result.affected === 1) {
        return foundAddress;
      }
    }
    throw new NotFoundException(`Record not found for  id ${id}`);
  }
}
