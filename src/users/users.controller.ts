import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAuthUserDTO, UpdateAuthUserDTO } from './dtos/auth.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  index() {
    return this.userService.findAll();
  }

  @Post('')
  register(@Body() body: CreateAuthUserDTO) {
    this.userService.create(body.name, body.email, body.password);
  }

  @Get('/:id')
  show(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() body: UpdateAuthUserDTO) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
