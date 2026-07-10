import { Column } from 'typeorm';

export class CreateUserDto {}

export class LoginDto {
  @Column()
  email: string;
}
