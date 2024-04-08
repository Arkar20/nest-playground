import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(name: string, email: string, password: string) {
    const user = this.repo.create({ name, email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  findAll() {
    return this.repo.find();
  }

  async update(id: number, body: Partial<User>) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new Error('User Not Found');
    }

    Object.assign(user, body);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new Error('User Not Found');
    }

    return this.repo.remove(user);
  }
}
