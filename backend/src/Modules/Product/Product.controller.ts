import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { ProductService } from './Product.service';
import { get } from 'http';

@Controller('/product')
export class ProductController {
  constructor(
    private readonly ProductService: ProductService,
    private jwtService: JwtService,
  ) {}

  @Post('/product')
  async register(@Body('name') name: string, @Body('price') price: number) {
    const product = await this.ProductService.create({
      name,
      price,
    });

    return product;
  }

  @Get('/display')
  async allproduct() {
    const product = await this.ProductService.displayall();

    if (!product) {
      throw new BadRequestException('no products');
    }
    return product;
  }
}
