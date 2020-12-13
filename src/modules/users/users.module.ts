import { Get, Module, Post } from '@nestjs/common';

@Module({})
export class UsersModule {
  @Post()
  createUser() {
    return 'created';
  }

  @Get()
  getuser() {
    return 'user';
  }
}
