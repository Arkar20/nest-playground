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
import {
  SignInUserDTO,
  SignUpUserDTO,
  UpdateAuthUserDTO,
} from './dtos/auth.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(SerializeInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('')
  index() {
    return this.userService.findAll();
  }

  @Post('/sign-up')
  register(@Body() body: SignUpUserDTO) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('/sign-in')
  signIn(@Body() body: SignInUserDTO) {
    return this.authService.signIn(body.email, body.password);
  }

  @Get('/:id')
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
