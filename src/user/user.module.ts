import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { RoleRepository } from './repository/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository])],
  providers: [UserService],
  exports: [UserService],
  controllers: [],
})
export class UserModule {}
