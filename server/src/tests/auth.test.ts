import { App } from '@/app';
import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { SignInRequestDto } from '@/dtos/auth/SignInRequest.dto';
import { SignUpRequestDto } from '@/dtos/auth/SignUpRequest.dto';
import { AuthRoute } from '@/routes/auth.route';
import request from 'supertest';
import knex from '../databases/index';

jest.setTimeout(20000);

const route = new AuthRoute();
const app = new App([route]);

/**
 * Wipe the database tables we're going to be using.
 */
beforeAll(async () => {
  await knex('users').del();
});

describe('Auth Tests', () => {
  /**
   * Test user registration.
   */
  describe('[POST] /auth/sign-up', () => {
    it('Create a new user and return a user dto and an auth token', async () => {
      const dto = SignUpRequestDto.fromJson({
        email: 'test@gmail.com',
        fullName: 'John Doe',
        password: 'password',
      });

      const res = await request(app.getServer()).post(`${route.path}/sign-up`).send(dto);
      expect(res.statusCode).toBe(200);
      expect(typeof res.body.data.token).toBe('string');
      expect(typeof res.body.data.user.email).toBe('string');
      expect(res.body.data.user.email).toEqual('test@gmail.com');
    });

    it('Should not allow a sign-up with an email of an existing user', async () => {
      const dto = SignUpRequestDto.fromJson({
        email: 'test@gmail.com',
        fullName: 'John Doe',
        password: 'password',
      });

      const res = await request(app.getServer()).post(`${route.path}/sign-up`).send(dto);
      expect(res.statusCode).toBe(409);
    });
  });

  /**
   * Check user sign in with the account we just created.
   */
  describe('[POST] /auth/sign-in', () => {
    it('Return a user dto and an auth token when valid credentails are provided', async () => {
      const dto = SignInRequestDto.fromJson({
        email: 'test@gmail.com',
        password: 'password',
      });

      const res = await request(app.getServer()).post(`${route.path}/sign-in`).send(dto);
      expect(res.statusCode).toBe(200);
      expect(typeof res.body.data.token).toBe('string');
      expect(typeof res.body.data.user.email).toBe('string');
      expect(res.body.data.user.email).toEqual('test@gmail.com');
    });

    it('Should return a 404 response if the email does not exist', async () => {
      const dto = SignInRequestDto.fromJson({
        email: 'unknown@gmail.com',
        password: 'password',
      });

      const res = await request(app.getServer()).post(`${route.path}/sign-in`).send(dto);
      expect(res.statusCode).toBe(404);
    });

    it('Should return a 401 response if the email exists, but the password is invalid', async () => {
      const dto = SignInRequestDto.fromJson({
        email: 'test@gmail.com',
        password: 'invalid-password',
      });

      const res = await request(app.getServer()).post(`${route.path}/sign-in`).send(dto);
      expect(res.statusCode).toBe(401);
    });
  });

  /**
   * Check forgot password
   */
  describe('[POST] /auth/forgot-password', () => {
    it('Should send an email with a recovery code and response with a 204', async () => {
      const dto = ForgotPasswordRequestDto.fromJson({
        email: 'test@gmail.com',
      });

      const res = await request(app.getServer()).post(`${route.path}/forgot-password`).send(dto);
      expect(res.statusCode).toBe(204);
    });
  });
});
