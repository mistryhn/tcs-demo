import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find({ relations: { reports: true } });
  }

  findOne(id: number) {
    return this.userRepo.findOne({
      where: { id },
      relations: { reports: true },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepo.create({ id, ...updateUserDto });
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete({ id });
  }

  async login(loginDto: LoginDto) {
    const email = loginDto.email;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException();
    return user;
  }
}
