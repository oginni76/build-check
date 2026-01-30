import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHi(): string {
    return 'Hello World. Using this pr branch to test!';
  }
}
