import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(private userService: UserService) {}

  async authenticateUser(email: string, password: string): Promise<User> {
    this.logger.log(`authentication request: ${email}`);
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('No registered user');
    }

    if (user.validatePassword(password)) {
      return user;
    }
    return null;
  }
}
