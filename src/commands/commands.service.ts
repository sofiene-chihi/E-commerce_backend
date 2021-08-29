import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import Money from '../utilities/handleMoney';
import { Repository } from 'typeorm';
import { Command } from './command.entity';
import { CreateCommandInput } from './dto/create-command-input';
import { UpdateCommandInput } from './dto/update-command-input';
import { BASE_CURRENCY, OUTPUT_PRECISION } from '../utilities/handleMoney';
import * as Numeral from 'numeral';
import { CommandData } from './dto/command-data';
import { commandStatus } from './enum/commandStatus.enum';
import { SelectedProducts } from './dto/selected-products-input';

const MIN_FREE = 100;

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

  createCommand(createCommandInput: CreateCommandInput): Promise<Command> {
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

  async generateOrder(commandData: CommandData) {
    const purshase_cost = this.calculatePurchaseCost(
      commandData.selectedProducts,
    );
    const shipping_cost = this.determinShippingCost(purshase_cost);
    const newCommand = await this.createCommand({
      payment_mode: commandData.payment_mode,
      purshase_cost,
      shipping_cost,
    });

    if (newCommand) {
      return newCommand;
    }
    throw new NotFoundException('error registering the command');
  }

  calculatePurchaseCost(products: SelectedProducts[]) {
    if (products && products.length > 0) {
      const total = products.reduce((acc, product) => {
        return new Money(String(acc), BASE_CURRENCY)
          .add(String(product.price * product.quantity))
          .toFixed(OUTPUT_PRECISION);
      }, '0');
      return parseInt(total);
    }
    return 0;
  }

  determinShippingCost(purchaseCost: number) {
    return purchaseCost < MIN_FREE
      ? parseInt(new Money('7', BASE_CURRENCY).toFixed(OUTPUT_PRECISION))
      : parseInt(new Money('0', BASE_CURRENCY).toFixed(OUTPUT_PRECISION));
  }
}
