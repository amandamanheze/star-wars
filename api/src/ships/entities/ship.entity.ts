import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;
}
