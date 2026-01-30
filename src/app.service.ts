import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const x: number = "I am a string";.
    return 'Hello World!';
  }
}
