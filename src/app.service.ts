import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  checkAPIHealth(): any {
      return {
        statusCode: 200,
        message: 'API is fine'
      }
  }
}
