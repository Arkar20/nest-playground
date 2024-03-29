import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateMessageDTO from './dtos/create-messages.dto';

@Controller('messages')
export class MessagesController {
  @Get('')
  getMessages() {
    return 'return all the messagges';
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
