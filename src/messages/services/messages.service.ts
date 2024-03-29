import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '../repositories/messages.repo';

@Injectable()
export class MessageService {
  constructor(public messageRepository: MessagesRepository) {}

  findAll() {
    return this.messageRepository.findAll();
  }

  findOne() {
    console.log('finding all messages logic');
  }
}
