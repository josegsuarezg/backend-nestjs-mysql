import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './users.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<User | HttpException>{
    const userFound = await this.usersRepository.findOne({where: {username: user.username}});
    if (userFound) {
      return new HttpException(`User ${user.username} already exists`, HttpStatus.CONFLICT);
    }
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser)
  }
  
  async getUsers() : Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(id: number): Promise<User | HttpException> {
    const userFound = await this.usersRepository.findOne({ 
      where: {id} });
    if(userFound){
      return new HttpException(`User not found`, HttpStatus.NOT_FOUND);
    }
    return userFound;
  }
  
  async updateUser(id: number, user: UpdateUserDto): Promise<UpdateResult | HttpException> {
    const userFound = await this.usersRepository.findOne({where:{id}})
    if(!userFound){
      return new HttpException(`User not found`, HttpStatus.NOT_FOUND)
    }
    return await this.usersRepository.update(id, user)
  }
  
  async deleteUser(id: number): Promise<DeleteResult | HttpException> {
    const userFound = await this.usersRepository.findOne({where:{id}})
    if(!userFound){
      return new HttpException(`User not found`, HttpStatus.NOT_FOUND)
    }
    return await this.usersRepository.delete({id});
  }
  
}

