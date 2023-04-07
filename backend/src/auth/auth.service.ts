import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUsername(username: string): Promise<User> {
    const user = await this.userService.findByEmail(username);
    return user;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    if (!user) return null;
    const passwordValid = await this.userService.comparePasswords(
      password,
      user.password,
    );
    if (passwordValid) return user;
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
