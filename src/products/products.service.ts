import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'express';
import { Between, Like, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product-input';
import { PriceRange } from './dto/price-range';
import { ProductFilter } from './dto/product-filter';
import { UpdateProductInput } from './dto/update-product-input';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRespository: Repository<Product>,
  ) {}

  async createProduct(
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    const newProduct = this.productRespository.create(createProductInput);
    return await this.productRespository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRespository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRespository.findOne(id);
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = this.findOne(id);
    if (await this.productRespository.delete(id)) {
      return product;
    }
    throw new BadRequestException("product doesn't exist in the database");
  }

  async updateProduct(
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const { id, name, category, img, price, mark, description } =
      updateProductInput;
    if (await this.productRespository.findOne(id)) {
      await this.productRespository.update(id, {
        name,
        category,
        img,
        price,
        mark,
        description,
      });
      return await this.productRespository.findOne(id);
    }

    throw new BadRequestException('product not found !');
  }

  // filtrage par category,priceRange,name,mark

  async findByCategory(category: string) : Promise<Product[]>{
    return this.productRespository.find({ where: { category: category} });
  }

  async findByPriceRange( priceRange : PriceRange) : Promise<Product[]>{
    return await this.productRespository.find({
      price: Between(priceRange.priceMin, priceRange.priceMax)
  });
  }


  async findByName( name : string) : Promise<Product[]>{
    let refactoredName = name.trim();
    return await this.productRespository.find({
      name: Like(`%${refactoredName}%`)
  });
  }

  async findByMark(mark: string) : Promise<Product[]>{
    return this.productRespository.find({ where: { mark: mark} });
  }


  async filterProducts( productFilter : ProductFilter) : Promise<[Product]> {

    let filteredProducts = null;

    if(productFilter.category!=null){
      filteredProducts = await this.findByCategory(productFilter.category);
    }

    if(productFilter.mark != null){
      let filteredProductsMark = await this.findByMark(productFilter.mark)
      if(filteredProducts!=null){
        let filteredProductstoString =filteredProducts.map(element => JSON.stringify(element));
        filteredProducts = filteredProductsMark.filter((element)=> filteredProductstoString.includes(JSON.stringify(element)) )
      }else{
        filteredProducts = filteredProductsMark;
      }
    }

    if(productFilter.priceRange != null){
      console.log("hello world");
      let filteredProductsPriceRange = await this.findByPriceRange(productFilter.priceRange)
      if(productFilter.category!=null || productFilter.mark!=null){
        let filteredProductstoString =filteredProducts.map(element => JSON.stringify(element));
        filteredProducts = filteredProductsPriceRange.filter((element)=> filteredProductstoString.includes(JSON.stringify(element)))
      }else{
        filteredProducts = filteredProductsPriceRange;
      }
    }
    return filteredProducts;
  }

}
