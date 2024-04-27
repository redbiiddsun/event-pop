import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDetail(): object {
    return {
      name: 'Eventpop API',
      version: '1.0.0',
      description: 'Eventpop is a web application for organize and reserve a event applications',
      repository: 'Not available',
    };
  }
}
