import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, HttpException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
  
  constructor(private usersService: UsersService) {}
  
  @Post()
  async createUser(@Body() newUser: CreateUserDto): Promise<User | HttpException> {
    return await this.usersService.createUser(newUser)
  }
  
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }
  
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User | HttpException> {
    return await this.usersService.getUser(id);
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: UpdateUserDto): Promise<User | HttpException> {
    return await this.usersService.updateUser(id, updatedUser)
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult | HttpException>{
  return await this.usersService.deleteUser(id)}
  
  @Post(':id/profile')
  async createProfile(@Param('id', ParseIntPipe) id:number, @Body() profile: CreateProfileDto): Promise<User | HttpException> {
    return await this.usersService.createProfile(id, profile)
  }
}
