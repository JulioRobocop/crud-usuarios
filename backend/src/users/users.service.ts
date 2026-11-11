import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: randomUUID(),
      name: createUserDto.name,
      email: createUserDto.email,
      role: createUserDto.role,
      createdAt: new Date()
    }
    for (let i: number = 0; i < this.users.length; i++) {
      if (newUser.email === this.users[i].email) {
        throw new ConflictException('Email ja cadastrado');
      }
    }
    this.users.push(newUser);

    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    for (let i: number = 0; i < this.users.length; i++) {
      if (id === this.users[i].id) {
        return this.users[i];
      }
    }
    throw new NotFoundException('Usuario nao encontrado');
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user: User = this.findOne(id);

    if (updateUserDto.email) {
      const email: boolean = this.users.some(
        (u) => u.email === updateUserDto.email && u.id !== id
      );
      if (email) {
        throw new ConflictException('Email ja cadastrado')
      }
    }

    Object.assign(user, updateUserDto);
    return user;
  }
}
