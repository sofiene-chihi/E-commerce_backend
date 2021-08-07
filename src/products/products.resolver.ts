import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product-input';
import { UpdateProductInput } from './dto/update-product-input';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }

  @Query(() => Product)
  getProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }
  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.updateProduct(updateProductInput);
  }

  @Mutation(() => Product)
  deleteProduct(@Args('id') id: number): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }
}
