import { Body, Controller, Post } from '@nestjs/common';
import CreateAuthUserDTO from './dtos/auth.dto';

@Controller('auth')
export class UsersController {
  @Post('')
  register(@Body() body: CreateAuthUserDTO) {
    return body;
  }
}
