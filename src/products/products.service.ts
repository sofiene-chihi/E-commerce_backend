import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product-input';
import { UpdateProductInput } from './dto/update-product-input';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private productRespository: Repository<Product>) {}


    async createProduct(createProductInput : CreateProductInput): Promise<Product> {

        const newProduct = this.productRespository.create(createProductInput);
        return await this.productRespository.save(newProduct);
    }

    async findAll(): Promise<Product[]>{
        return await this.productRespository.find();
    }

    async findOne(id: number): Promise<Product>{
        return await this.productRespository.findOne(id);
    }

    async deleteProduct(id: number): Promise<Product> {

        let product  = this.findOne(id);
        if ( await this.productRespository.delete(id)){
            return product;
        }
        throw new BadRequestException("product doesn't exist in the database");
    }


    async updateProduct(updateProductInput: UpdateProductInput) : Promise<Product> {

        let {id, name,category,img, price, mark, description} = updateProductInput;
        if( await this.productRespository.findOne(id) ) {
            await this.productRespository.update(id, {name,category,img,price,mark,description});
            return await this.productRespository.findOne(id);
        }

        throw new BadRequestException("product not found !")
        
      }

}
