import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { RegisterDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    const user = plainToClass(RegisterDto, registerDto);
    const errors = await validate(user);
    if (errors.length) throw new BadRequestException(errors);

    const userExists = await this.userService.findByEmail(user.email);
    if (userExists) throw new BadRequestException('User already exists');

    return this.userService.create(registerDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@Request() req): Promise<User> {
    return req.user;
  }
}
