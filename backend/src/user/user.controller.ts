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
import { RegisterDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    const userExists = await this.userService.findByEmail(registerDto.email);
    if (userExists) throw new BadRequestException('User already exists');

    const user = await this.userService.create(registerDto);
    return user;
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@Request() req): Promise<User> {
    return req.user;
  }
}
