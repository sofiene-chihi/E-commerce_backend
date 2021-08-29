import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { SelectedProducts } from './selected-products-input';

@InputType()
export class CommandData {
  @IsAlpha()
  @Field()
  payment_mode: string;

  @Field(() => [SelectedProducts])
  selectedProducts: SelectedProducts[];
}
