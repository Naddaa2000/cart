import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
}
