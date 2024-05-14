import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule, 
    PassportModule,
    JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      global: true,
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '60s' },
    }),
    inject: [ConfigService],
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
