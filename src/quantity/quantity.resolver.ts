import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AddQuantityInput } from './dto/add-quantity-input';
import { UpdateQuantityInput } from './dto/update-quantity-input';
import { Quantity } from './quantity.entity';
import { QuantityService } from './quantity.service';

@Resolver(()=>Quantity)
export class QuantityResolver {

    constructor(private quantitySerice: QuantityService){}

    @Query(() => [Quantity])
    quantities(): Promise<Quantity[]> {
      return this.quantitySerice.findAll();
    }
  
    @Mutation(() => Quantity)
    addQuantity(
      @Args('addQuantity') addQuantityInput: AddQuantityInput,
    ): Promise<Quantity> {
      return this.quantitySerice.addQuantity(addQuantityInput);
    }
  
    @Query(() => Quantity)
    getProduct(@Args('id', { type: () => Int }) id: number): Promise<Quantity> {
      return this.quantitySerice.findOne(id);
    }    

    @Mutation(() => Quantity)
    updateQuantity(
      @Args('updateQuantity') updateQuantityInput: UpdateQuantityInput,
    ): Promise<Quantity> {
      return this.quantitySerice.updateQuantity(updateQuantityInput);
    }

    @Mutation(() => Quantity)
    deleteQuantity(@Args('id', { type: () => Int }) id: number): Promise<Quantity> {
      return this.quantitySerice.deleteQuantity(id);
    }


}
