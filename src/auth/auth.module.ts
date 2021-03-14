import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PassportModule.register({ session: true, defaultStrategy: 'local' }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
  exports: [PassportModule, LocalStrategy],
})
export class AuthModule {}
