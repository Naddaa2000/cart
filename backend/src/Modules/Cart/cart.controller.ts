import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Get,
  Delete,
  Put,
  UseGuards,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Response, Request } from 'express';
import { cart } from 'src/Entity/Cart.entity';
@Controller('/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('quantity') quantity: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      quantity = 0;
      // Assuming you have authentication middleware setting user in the request object
      const cartItem = await this.cartService.addToCart(
        name,
        price,
        quantity,
        req,
        res,
      );

      console.log(cartItem);
      return res
        .status(201)
        .json({ message: 'Added to cart', data: cartItem, success: true });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get('/display')
  //@UseGuards(JwtAuthGuard)
  async getCartItems(@Req() req: Request, @Res() res: Response) {
    // const userId = req.user.id; // Assuming user ID is in the JWT payload
    return this.cartService.getCartItemsByUserId(req, res);
  }

  @Delete('remove/:id')
  async removeFromCart(@Param('id') itemId: number): Promise<void> {
    await this.cartService.decreaseQuantity(itemId);
  }

  @Put('increaseQuantity/:id')
  async increaseQuantity(@Param('id') itemId: number): Promise<void> {
    await this.cartService.increaseQuantity(itemId);
  }

  // @Post('addd')
  // addTocart(@Body() cartItem: cart): Promise<cart> {
  //   return this.cartService.addTocart(cartItem);
  // }
  @Delete('checkout')
  async checkout(@Req() req: Request, @Res() res: Response) {
    try {
      // Call the service method to remove all items from the cart for the logged-in user
      await this.cartService.removeAllItemsForUsers(req, res);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
