import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddQuantityInput } from './dto/add-quantity-input';
import { UpdateQuantityInput } from './dto/update-quantity-input';
import { Quantity } from './quantity.entity';

@Injectable()
export class QuantityService {

    constructor(
        @InjectRepository(Quantity) private quantityRepository: Repository<Quantity>,
      ) {}
    
      async addQuantity(
        addQuantityInput: AddQuantityInput,
      ): Promise<Quantity> {
        const quantity = this.quantityRepository.create(addQuantityInput);
        return await this.quantityRepository.save(quantity);
      }
    
      async findAll(): Promise<Quantity[]> {
        return await this.quantityRepository.find();
      }
    
      async findOne(id: number): Promise<Quantity> {
        return await this.quantityRepository.findOne(id);
      }

      async updateQuantity(
        updateQuantityInput: UpdateQuantityInput,
      ): Promise<Quantity> {
        const { id, ...input } = updateQuantityInput;
        await this.quantityRepository.update(id, input);
        return await this.quantityRepository.findOne(id);
      }

      async deleteQuantity(id: number): Promise<Quantity> {
        const foundQuantity = this.findOne(id);
        if (foundQuantity) {
          const result = await this.quantityRepository.delete(id);
          if (result.affected === 1) {
            return foundQuantity;
          }
        }
        throw new NotFoundException(`Record not found for  id ${id}`);
      }



}
