import { IsLatitude, IsLongitude, IsNumber, Max, Min } from 'class-validator';
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  price: number;

  @IsLongitude()
  @Column()
  lon: string;

  @IsLatitude()
  @Column()
  lat: string;

  @IsNumber()
  @Column()
  @Min(0)
  @Max(100000)
  mileage: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
