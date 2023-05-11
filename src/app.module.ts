import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity'
import { Profile } from './users/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'entrar01',
      database: 'userdb',
      // entities: [__dirname + '/**/*.entity.ts'],
      entities: [User, Profile],
      synchronize: true
      }), 
    UsersModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
