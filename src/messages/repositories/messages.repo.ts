import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  findAll() {
    console.log('finding all messages');
  }
}
