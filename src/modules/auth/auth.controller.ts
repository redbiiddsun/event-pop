import {
  Controller,
  Post,
  Body,
  Res,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { TransformInterceptor } from 'src/common/interceptors/response.interceptor';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() createAuthDto: LoginAuthDto, @Res({passthrough: true}) res: Response){
    const { access_token } = await this.authService.signIn(createAuthDto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    return { statusCode: HttpStatus.OK, message: 'Login Success' };
  }
}
