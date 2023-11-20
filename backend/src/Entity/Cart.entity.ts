import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity('cart')
export class cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  // Define the relationship with User entity if necessary
  @ManyToOne(() => User, (user) => user.id)
  userId: User;
}
