import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
<<<<<<< HEAD
import { UsersModule } from './users/users.module';
// import { User } from './users/users.entity'
=======
import { User } from './users/users.entity'
import { Profile } from './users/profile.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/post.entity';
>>>>>>> d19cd8cd95cd1c02eb55d1f6c6484aee5aa70cdd

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'entrar01',
      database: 'userdb',
<<<<<<< HEAD
      entities: [__dirname + '/**/*.entity.ts'],
      // entities: [User],
      synchronize: true
      }), 
    UsersModule ],
  controllers: [],
  providers: [],
=======
      // entities: [__dirname + '/**/*.entity.ts'],
      entities: [User, Profile, Post],
      synchronize: true
      }), 
    UsersModule],
  controllers: [],
  providers: [],
>>>>>>> d19cd8cd95cd1c02eb55d1f6c6484aee5aa70cdd
})
export class AppModule {}
