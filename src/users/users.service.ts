import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
    console.log('createUserDto', createUserDto);

    const user = this.userRepo.create(createUserDto);
    console.log('user', user);
    const res = this.userRepo.save(user);
    console.log('res', res);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepo.create({ id, ...updateUserDto });
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete({ id });
  }
}
