import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductController } from '../Product/Product.controller';
import { ProductService } from './Product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { products } from 'src/Entity/Product.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([products]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
})
export class ProducrModule {}
