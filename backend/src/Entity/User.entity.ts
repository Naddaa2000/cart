import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { cart } from './Cart.entity';
@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  // @OneToMany(() => cart, (cart) => cart.user)
  // cartItems: cart[];
}
