import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { products } from 'src/Entity/Product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(products)
    private readonly productRepository: Repository<products>,
  ) {}

  async create(data: any): Promise<products> {
    return this.productRepository.save(data);
  }

  async displayall() {
    const product = await this.productRepository.find();
    if (!product) throw new Error('No product found');
    return product;
  }
}
