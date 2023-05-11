import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './users.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async createUser(user: CreateUserDto): Promise<User | HttpException>{
    const userFound = await this.usersRepository.findOne({where: {username: user.username}});
    if (userFound) new HttpException(`User ${user.username} already exists`, HttpStatus.CONFLICT);
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser)
  }
  
  async getUsers() : Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(id: number): Promise<User | HttpException> {
    const userFound = await this.usersRepository.findOne({where: {id}});
    if(userFound) new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    return userFound;
  }
  
  async updateUser(id: number, user: UpdateUserDto): Promise<User | HttpException> {
    const userFound = await this.usersRepository.findOne({where:{id}})
    if(!userFound) new HttpException(`User not found`, HttpStatus.NOT_FOUND)
    const updatedUser = Object.assign(userFound, user);
    return this.usersRepository.save(updatedUser)
  }
  
  async deleteUser(id: number): Promise<DeleteResult | HttpException> {
    const result = await this.usersRepository.delete({id})
    if (result.affected === 0) new HttpException(`User not found`, HttpStatus.NOT_FOUND)
    return result
  }
  
}

