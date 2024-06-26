import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  SignInUserDTO,
  SignUpUserDTO,
  UpdateAuthUserDTO,
} from './dtos/auth.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UserResponse } from './dtos/response/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserResponse)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/sign-up')
  async register(@Body() body: SignUpUserDTO, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);

    session.userId = user.id;

    return user;
  }

  @Post('/sign-in')
  async signIn(@Body() body: SignInUserDTO, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);

    session.userId = user.id;

    return user;
  }

  @Post('/sign-out')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/')
  @UseGuards(AuthGuard)
  show(@CurrentUser() currentUser: string) {
    return currentUser;
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
