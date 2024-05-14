import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginAuthDto: LoginAuthDto) {
    // Fetch User with Email
    const user = await this.usersService.findWithEmail(loginAuthDto.email);
    if (!user) throw new UnauthorizedException('Email or password not match');

    // Compare Password
    const isPasswordMatch = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );
    if (!isPasswordMatch)
      throw new UnauthorizedException('Email or password not match');

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}