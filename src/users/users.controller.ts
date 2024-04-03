import { Body, Controller, Post } from '@nestjs/common';
import CreateAuthUserDTO from './dtos/auth.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('')
  register(@Body() body: CreateAuthUserDTO) {
    this.userService.create(body.name, body.email, body.password);
  }
}
