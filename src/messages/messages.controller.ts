import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateMessageDTO from './dtos/create-messages.dto';
import { MessageService } from './services/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public msgService: MessageService) {}

  @Get('')
  getMessages() {
    return this.msgService.findAll();
  }

  @Post('')
  store(@Body() body: CreateMessageDTO) {
    return 'this is the content  ' + body.content;
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return 'return single messages is ' + id;
  }
}
