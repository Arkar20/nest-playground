import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { scrypt as _script, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {
  constructor(private userServ: UsersService) {}

  async signUp(email: string, password: string) {
    const userExists = this.userServ.findByEmail(email);

    if (userExists) {
      throw new BadRequestException('User Already Exists');
    }

    // hash the password

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.userServ.create('arkar', email, result);

    return user;
  }
}
