import { Body, Controller, Delete, Get, Post, Redirect } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.create(user);
  }

  @Redirect(
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLahKLy8pQdCM0SiXNn3EfGIXX19QGzUG3',
    302,
  )
  @Get()
  getUser() {
    return 'user';
  }

  @Delete()
  deleteUser() {
    return 'deleted';
  }
}
