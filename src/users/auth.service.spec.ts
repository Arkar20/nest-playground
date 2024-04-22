import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  let fakeUserSrv: Partial<UsersService>;

  let users: User[] = [];

  beforeEach(async () => {
    fakeUserSrv = {
      findByEmail: (email: string) => {
        const user = users.find((user) => user.email === email);

        if (!user) {
          return Promise.resolve(null);
        }

        return Promise.resolve(user);
      },
      create: (name: string, email: string, password: string) => {
        users = [
          {
            id: users.length + 1,
            name: name,
            email: email,
            password: password,
          } as User,
          ...users,
        ];

        return Promise.resolve({
          id: 1,
          name: 'arkar',
          email,
          password,
        } as User);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserSrv,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  it('can hash the password', async () => {
    const user = await service.signUp('test@gmail.com', 'password');

    expect(user.password).not.toEqual('password');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();

    expect(hash).toBeDefined();
  });

  it('can throw error if user already registered', async () => {
    await service.signUp('testupdate@gmail.com', 'password');

    await expect(
      service.signUp('testupdate@gmail.com', 'password'),
    ).rejects.toThrow(BadRequestException);
  });

  it('can throw error with unregistered email', async () => {
    await expect(
      service.signIn('testungistered@gmail.com', 'password'),
    ).rejects.toThrow(NotFoundException);
  });

  it('can throw error with incorrect hashed password', async () => {
    await service.signUp('testhashpassword@gmail.com', 'password');

    const signInProcess = service.signIn(
      'testhashpassword@gmail.com',
      'Incorrectpassword',
    );

    await expect(signInProcess).rejects.toThrow(BadRequestException);
  });

  it('returns the correct user ', async () => {
    await service.signUp('arkar@gmail.com', 'password');

    const user = await service.signIn('arkar@gmail.com', 'password');

    expect(user).toBeDefined();
  });
});
