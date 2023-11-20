import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './Modules/User/user.module';
import { CartModule } from './Modules/Cart/cart.module';
import { ProducrModule } from './Modules/Product/Product.module';
import { typeOrmConfigAsync } from './config/typeOrm.config';
require('dotenv').config();

@Module({
  imports: [
    UserModule,
    CartModule,
    ProducrModule,
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    JwtModule.register({
      secret: process.env.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
