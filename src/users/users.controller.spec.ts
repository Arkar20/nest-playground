import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { SignUpUserDTO } from './dtos/auth.dto';

describe('UsersController', () => {
  let controller: UsersController;

  let authServ: Partial<AuthService>;

  let userServ: Partial<UsersService>;

  let users: User[] = [];

  beforeEach(async () => {
    authServ = {
      signIn(email: string, password: string) {
        return Promise.resolve({
          id: users.length + 1,
          name: 'arkar',
          email,
          password,
        } as User);
      },
      signUp(email: string, password: string) {
        const user = {
          id: users.length + 1,
          name: 'arkar',
          email: email,
          password: password,
        } as User;

        users = [user, ...users];

        return Promise.resolve(user);
      },
    };

    userServ = {
      remove(id: number) {
        const user = users.find((user) => user.id === id);
        return Promise.resolve(user);
      },
      update(id: number, body: Partial<User>) {
        return Promise.resolve({} as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: authServ,
        },
        {
          provide: UsersService,
          useValue: userServ,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('can sign in', async () => {
    const session = { userId: null };

    const user = await controller.signIn(
      {
        email: 'test@gmail.com',
        password: 'password',
      },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });

  it('can register', async () => {
    const session = { userId: null };

    const payload: SignUpUserDTO = {
      email: 'test@gmail.com',
      name: 'arkar',
      password: 'password',
    };

    const user = await controller.register(payload, session);

    expect(user.id).toEqual(users.length);
    expect(session.userId).toEqual(users.length);
  });
});
