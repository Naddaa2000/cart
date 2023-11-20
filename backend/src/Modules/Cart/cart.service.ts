import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cart } from 'src/Entity/Cart.entity';
import { log } from 'console';
import { Request, Response, NextFunction } from 'express';
import { elementAt } from 'rxjs';
require('dotenv').config();
const jwt = require('jsonwebtoken');
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(cart)
    private readonly cartRepository: Repository<cart>,
  ) {}

  async addToCart(name: string, price: number, quantity: number, req, res) {
    const token = req.header('auth-token');
    if (!token) {
      res.status(401).send('Invalid credentials');
    }

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.user;

      // check if the product of the specific user exist's
      const existingItem = await this.cartRepository
        .createQueryBuilder('cart')
        .where('cart.name = :name', { name })
        .andWhere('cart.userId = :userId', { userId: req.user.id })
        .getOne();

      if (existingItem) {
        //if the item exist update the quantity
        existingItem.quantity += 1;
        const updatedItem = await this.cartRepository.save(existingItem);
        console.log('Item updated:', updatedItem);
        return updatedItem;
      }

      // else add new product to the cart with user id
      const cartItem = this.cartRepository.create({
        name,
        price,
        quantity: 1,
        userId: req.user.id,
      });
      const savedCartItem = await this.cartRepository.save(cartItem);
      console.log('Added to Cart:', savedCartItem);
      return savedCartItem;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw new BadRequestException(error.message);
    }
  }

  async getCartItemsByUserId(req, res) {
    const token = req.header('auth-token');
    if (!token) {
      res.status(401).send('Invalid credentials');
    }

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.user;

      // get users item from the cart
      const cartItems = await this.cartRepository
        .createQueryBuilder('cart')
        .where('cart.userId = :userId', { userId: req.user.id })
        .getMany();
      // if the user does not have any product in the cart
      if (!cartItems || cartItems.length === 0) {
        throw new NotFoundException('Cart items not found');
      }
      //else display the item of users
      console.log('Cart Items:', cartItems);
      res.send(cartItems);
    } catch (error) {
      console.error('Error getting cart items by user ID:', error.message);
      throw new BadRequestException(error.message);
    }
  }

  async increaseQuantity(id: any): Promise<void> {
    try {
      const item = await this.cartRepository.findOne({
        where: { id },
      });
      console.log(item);

      if (!item) {
        throw new NotFoundException('Item not found in the cart.');
      }

      // Increase the quantity of the item
      item.quantity += 1;
      await this.cartRepository.save(item);

      console.log('Item quantity increased successfully.');
    } catch (error) {
      throw new NotFoundException('Failed to increase item quantity.');
    }
  }

  async decreaseQuantity(id: number): Promise<void> {
    const item = await this.cartRepository.findOne({ where: { id } });

    if (!item) {
      throw new NotFoundException('Item not found in the cart.');
    }

    //if quantity is greater than 1 decrease the quantity
    if (item.quantity > 1) {
      item.quantity -= 1;
      await this.cartRepository.save(item);
    } else {
      // else remove the item from the cart
      await this.cartRepository.remove(item);
    }
  }

  async removeAllItemsForUsers(req, res): Promise<void> {
    try {
      const token = req.header('auth-token');
      if (!token) {
        res.status(401).send('Invalid credentials');
      }

      const data = jwt.verify(token, 'nada123');
      req.user = data.user;

      const deleteResult = await this.cartRepository
        .createQueryBuilder()
        .delete()
        .from(cart)
        .where('userId = :userId', { userId: req.user.id })
        .execute();
      res.send('items are checked out');

      if (deleteResult.affected === 0) {
        res.send('Cart items not found for the specified user');
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
