import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John',
      email: 'John@gmail.com',
      role: 'engineer',
    },
    {
      id: 2,
      name: 'Doe',
      email: 'Doe@gmail.com',
      role: 'admin',
    },
    {
      id: 3,
      name: 'Yash',
      email: 'Yash@gmail.com',
      role: 'intern',
    },
    {
      id: 4,
      name: 'Rahul',
      email: 'Rahul@gmail.com',
      role: 'engineer',
    },
    {
      id: 5,
      name: 'Amit',
      email: 'Amit@gmail.com',
      role: 'engineer',
    },
  ];
  findAll(role?: 'intern' | 'admin' | 'engineer') {
    if (role) {
      const roles = this.users.filter((user) => user.role === role);
      if (roles.length === 0) {
        throw new NotFoundException(`No users with role ${role} found`);
      }

      return this.users;
    }
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id == id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
  create(user: CreateUserDto) {
    const usersByHighestId = this.users.slice().sort((a, b) => b.id - a.id);
    const highestId = usersByHighestId[0].id + 1;
    const newUser = {
      id: highestId,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
        };
      }
      return user;
    });
    return this.findOne(id);
  }
  delete(id: number) {
    const userToDelete = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return userToDelete;
  }
}
