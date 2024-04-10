import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { scrypt as _script, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private userServ: UsersService) {}

  async signUp(email: string, password: string) {
    const userExists = await this.userServ.findByEmail(email);

    if (userExists) {
      throw new BadRequestException('User Already Exists');
    }

    // hash the password
    const result = await this.createHash(password);

    const user = await this.userServ.create('arkar', email, result);

    return user;
  }

  async signIn(email: string, password: string) {
    const userExists = await this.userServ.findByEmail(email);

    if (!userExists) {
      throw new NotFoundException('User Not Found');
    }

    const isPasswordCorrect = await this.compareHash(
      password,
      userExists.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Incorrect Password');
    }

    return userExists;
  }

  //helper
  async createHash(password: string, salt?: string) {
    // hash the password
    const appliedSalt = salt ?? randomBytes(8).toString('hex');

    const hash = (await scrypt(password, appliedSalt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    return result;
  }

  async compareHash(password: string, targetPassword: string) {
    const [salt, comparedPassword] = targetPassword.split('.');

    const hashedPasswordWithSalt = await this.createHash(password, salt);

    const hashedPassword = hashedPasswordWithSalt.split('.')[1];

    return hashedPassword === comparedPassword;
  }
}
