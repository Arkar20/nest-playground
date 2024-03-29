import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './repositories/messages.repo';
import { MessageService } from './services/messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessageService, MessagesRepository],
})
export class MessagesModule {}
