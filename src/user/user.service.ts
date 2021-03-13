import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(
      `creating user for ${createUserDto.name}, ${createUserDto.email}`,
    );
    return this.userRepository.createUser(createUserDto);
  }

  async findOne(pid: string): Promise<User> {
    this.logger.log(`retrieving user with pid: ${pid}`);
    return this.userRepository.findOne({ pid });
  }

  async remove(pid: string): Promise<User> {
    this.logger.log(`removing user with pid:${pid}`);
    return this.userRepository.softRemove({ pid });
  }
}
