import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product-input';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {


    constructor(@InjectRepository(Product) private productRespository: Repository<Product>) {}


    createProduct(createProductInput : CreateProductInput): Promise<Product> {

        const newProduct = this.productRespository.create(createProductInput);
        return this.productRespository.save(newProduct);
    }

    async findAll(): Promise<Product[]>{
        return this.productRespository.find();
    }

    findOne(id: number): Promise<Product>{
        return this.productRespository.findOne(id);
    }

}
