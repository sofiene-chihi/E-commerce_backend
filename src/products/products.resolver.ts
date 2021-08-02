import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product-input';
import { UpdateProductInput } from './dto/update-product-input';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Resolver(of => Product)
export class ProductsResolver {

    constructor(private productsService: ProductsService){}

    @Query(returns => [Product])
        products(): Promise<Product[]> {
            return this.productsService.findAll();
        }

    @Mutation(returns => Product)
    createProduct(@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
        return this.productsService.createProduct(createProductInput);
    }

    @Query(returns => Product)
    getProduct(@Args('id', {type: () => Int}) id: number): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @Mutation(returns => Product)
    updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput): Promise<Product> {
        return this.productsService.updateProduct(updateProductInput);
    }

    @Mutation(returns => Product)
    deleteProduct(@Args('id') id: number): Promise<Product> {
        return this.productsService.deleteProduct(id);
    }

}
