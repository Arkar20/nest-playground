import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAuthUserDTO, UpdateAuthUserDTO } from './dtos/auth.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('')
  index() {
    return this.userService.findAll();
  }

  @Post('')
  register(@Body() body: CreateAuthUserDTO) {
    return this.authService.signUp(body.email, body.password);
  }

  @Get('/:id')
  @UseInterceptors(SerializeInterceptor)
  async show(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('User not Found');
    }

    return user;
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
