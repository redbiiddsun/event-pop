import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JWTPayload } from '../types/auth.type';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (request: Request) => {
              return request?.cookies?.access_token;
            },
        ]),
      secretOrKey: configService.get('JWT_SECRET'), // Use the secret from environment variables
      ignoreExpiration: false,
    });
  }

  async validate(payload: JWTPayload) {
    return { id: payload.sub, email: payload.email };
  }
}