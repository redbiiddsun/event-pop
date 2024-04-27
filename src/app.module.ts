import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        explicitConnect: true,
        prismaOptions: {
          log: [
            {
              emit: 'event',
              level: 'query',
            },
          ],
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
