import {
  UseGuards,
  Controller,
  Get,
  Logger,
  Post,
  Render,
  Res,
  Redirect,
  UsePipes,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginGuard } from './guards/login.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private userService: UserService) {}

  @Get('login')
  @Render('auth/login')
  async login() {
    return {};
  }

  @Post('authenticate')
  @UseGuards(LoginGuard)
  authenticate(@Res({ passthrough: true }) res: Response) {
    return res.redirect('authenticated');
  }

  @Get('authenticated')
  @UseGuards(AuthenticatedGuard)
  async authenticated() {
    return classToPlain(new User());
  }

  @Get('register')
  @Render('auth/register')
  register() {
    return;
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  registerUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
