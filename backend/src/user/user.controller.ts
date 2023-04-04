import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto, RegisterDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    const userExists = await this.userService.findByEmail(registerDto.email);
    if (userExists) throw new BadRequestException('User already exists');

    const user = await this.userService.create(registerDto);
    return user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Request() req,
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string }> {
    const { user } = req;
    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  async profile(@Request() req): Promise<User> {
    return req.user;
  }
}
