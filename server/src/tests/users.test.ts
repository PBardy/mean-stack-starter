import request from 'supertest';
import { App } from '@/app';
import { UsersRoute } from '@/routes/users.route';
import { CreateUserDto } from '@/dtos/user/create-user.dto';
import { AuthRoute } from '@/routes/auth.route';

jest.setTimeout(20000);

const route = new UsersRoute();
const authRoute = new AuthRoute();
const app = new App([authRoute, route]);

beforeAll(async () => {
  // seed the database
});

afterAll(() => {
  jest.clearAllTimers();
});

describe('User Tests', () => {
  describe('[GET] /users', () => {
    it('Should return 404 as the authentication token is missing', async () => {
      const res = await request(app.getServer()).get(`${route.path}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe('[GET] /users', () => {
    it('Should return an array of user dtos', async () => {
      const res = await request(app.getServer()).get(`${route.path}`).set('Authorization', 'Bearer test-auth-token');

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeTruthy();
      expect(res.body.data?.length).toBeTruthy();
    });
  });

  describe('[POST] /users', () => {
    it('Should create a new user and return a user dto', async () => {
      const dto = CreateUserDto.fromJson({
        fullName: 'Test user',
        email: 'newuser@test.com',
        password: 'password',
      });

      const res = await request(app.getServer()).post(`${route.path}`).send(dto).set('Authorization', 'Bearer test-auth-token');

      expect(res.statusCode).toBe(200);
    });
  });
});
