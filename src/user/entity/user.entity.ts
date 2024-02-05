import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: string;

  @Column()
  country: string;

  @Column()
  phoneNumber: string;

  @Column()
  salary: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  isActive: boolean;
}