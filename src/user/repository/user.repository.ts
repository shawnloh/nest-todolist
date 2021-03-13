import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, name, password, phone } = createUserDto;
      const user = new User();
      user.email = email;
      user.name = name;
      user.password = password;
      user.phone = phone;

      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      if (error.errno === 1062) {
        throw new ConflictException('User exist');
      }
      throw new InternalServerErrorException();
    }
  }
}
