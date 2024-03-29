import { Controller, Get, Param } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get('')
  getMessages() {
    return 'return all the messagges';
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return 'return single messages is ' + id;
  }
}
