import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { cart } from 'src/Entity/Cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([cart])],
  controllers: [CartController],
  providers: [CartService],
  exports: [],
})
export class CartModule {}
