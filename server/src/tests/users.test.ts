import { App } from '@/app';
import { CreateUserDto } from '@/dtos/user/create-user.dto';
import { UsersRoute } from '@/routes/users.route';
import request from 'supertest';

// Test users
describe('Testing /users', () => {
  describe('[GET] /users', () => {
    it('code: 200, data: all users', () => {
      const route = new UsersRoute();
      const app = new App([route]);
      return request(app.getServer()).get(`${route.path}`).expect(200);
    });
  });

  describe('[GET] /users/:uuid', () => {
    it('code: 200, data: get a user by their uuid', () => {
      const uuid = '';
      const route = new UsersRoute();
      const app = new App([route]);
      return request(app.getServer()).get(`${route.path}/${uuid}`).expect(200);
    });
  });

  describe('[GET] /users/:email', () => {
    it('code: 200, data: get a user by their email', () => {
      const email = '';
      const route = new UsersRoute();
      const app = new App([route]);
      return request(app.getServer()).get(`${route.path}/${email}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('code: 201, data: the newly created user', () => {
      const dto = CreateUserDto.fromJson({
        email: 'test1@gmail.com',
        password: 'password',
      });

      const route = new UsersRoute();
      const app = new App([route]);
      return request(app.getServer()).post(`${route.path}`).send(dto).expect(201);
    });
  });

  describe('[POST] /users', () => {
    it('code: 409, error: user with that email address already exists', () => {
      const dto = CreateUserDto.fromJson({
        email: 'test1@gmail.com',
        password: 'password',
      });

      const route = new UsersRoute();
      const app = new App([route]);
      return request(app.getServer()).post(`${route.path}`).send(dto).expect(409);
    });
  });

  describe('[DELETE] /users/:uuid', () => {
    it('code: 201, data: the newly created user', () => {
      const email = '';
      const route = new UsersRoute();
      const app = new App([route]);
      return request(app.getServer()).get(`${route.path}/${email}`).expect(201);
    });
  });
});
