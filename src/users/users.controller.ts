import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Session,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.usersService.login(loginDto);
    session.userId = user?.id;
    session.email = user?.email;
    return { message: 'Login successful', user };
  }

  @Get('/profile')
  async profile(@Session() session, @Req() req) {
    return { session, cookie: req?.cookies };
  }

  @Post('/logout')
  async logout(@Session() session) {
    session.destroy(() => {});
    return { message: 'Logout successful' };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(parseInt(id), updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
