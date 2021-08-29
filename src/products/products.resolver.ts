import { UseGuards } from '@nestjs/common';
import { Args, Float, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductInput } from './dto/create-product-input';
import { PriceRange } from './dto/price-range';
import { ProductFilter } from './dto/product-filter';
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
  @UseGuards(GqlAuthGuard)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }

  @Query(() => Product)
  getProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }


  @Query(() => [Product])
  filterProducts(@Args('productFilter', { type: () => ProductFilter }) productFilter: ProductFilter): Promise<Product[]> {
    return this.productsService.filterProducts(productFilter);
  }


  // @Query(() => [Product])
  // getProductByCategory(@Args('category', { type: () => String }) category: string): Promise<Product[]> {
  //   return this.productsService.findByCategory(category);
  // }

  // @Query(() => [Product])
  // getProductByPriceRange(@Args('priceRange', { type: () => PriceRange }) price: PriceRange): Promise<Product[]> {
  //   return this.productsService.findByPriceRange(price);
  // }

  // @Query(() => [Product])
  // getProductByName(@Args('name', { type: () => String }) name: string): Promise<Product[]> {
  //   return this.productsService.findByName(name);
  // }


  // @Query(() => [Product])
  // getProductByMark(@Args('mark', { type: () => String }) mark: string): Promise<Product[]> {
  //   return this.productsService.findByMark(mark);
  // }

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.updateProduct(updateProductInput);
  }

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard)
  deleteProduct(@Args('id') id: number): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }
}
