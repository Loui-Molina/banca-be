import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {

    private readonly users: User[];

    constructor() {
      this.users = [
        {
          userId: 1,
          username: 'loui',
          password: 'manco',
        },
        {
          userId: 2,
          username: 'pelado',
          password: 'judio',
        },
        {
          userId: 3,
          username: 'gonza',
          password: 'hola',
        },
      ];
    }
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
      
}
