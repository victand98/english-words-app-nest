import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    if (!user) return null;
    const passwordValid = await this.userService.comparePasswords(
      password,
      user.password,
    );
    if (!user) throw new NotAcceptableException('User not found');
    if (user && passwordValid) return user;
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
