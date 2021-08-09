import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import Money from 'src/utilities/handleMoney';
import { Repository } from 'typeorm';
import { Command } from './command.entity';
import { CreateCommandInput } from './dto/create-command-input';
import { UpdateCommandInput } from './dto/update-command-input';
import { BASE_CURRENCY, OUTPUT_PRECISION } from '../utilities/handleMoney';

@Injectable()
export class CommandsService {
  constructor(
    @InjectRepository(Command) private commandRespository: Repository<Command>,
  ) {}

  findAll(): Promise<Command[]> {
    return this.commandRespository.find();
  }

  findOne(id: number): Promise<Command> {
    return this.commandRespository.findOne(id);
  }

  createCommande(createCommandInput: CreateCommandInput): Promise<Command> {
    const newCommand = this.commandRespository.create(createCommandInput);
    return this.commandRespository.save(newCommand);
  }

  async updateCommand(
    updateCommandInput: UpdateCommandInput,
  ): Promise<Command> {
    const { id, ...input } = updateCommandInput;
    await this.commandRespository.update(id, input);
    return await this.commandRespository.findOne(id);
  }

  async deleteCommand(id: number): Promise<Command> {
    const foundCommand = this.findOne(id);
    if (foundCommand) {
      const result = await this.commandRespository.delete(id);
      if (result.affected === 1) {
        return foundCommand;
      }
    }
    throw new NotFoundException(`Record not found for  id ${id}`);
  }

  calculatePurchaseCost(products: Product[]) {
    if (products && products.length > 0)
      return products.reduce((acc, product) => {
        return new Money(String(acc), BASE_CURRENCY)
          .add(String(product.price))
          .toFixed(OUTPUT_PRECISION);
      }, '0');
  }

  determinShippingCost(purchaseCost: number, minimumForFree) {
    return purchaseCost > minimumForFree
      ? new Money('7', BASE_CURRENCY).toFixed(OUTPUT_PRECISION)
      : new Money('0', BASE_CURRENCY).toFixed(OUTPUT_PRECISION);
  }
}
