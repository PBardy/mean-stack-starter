import { App } from '@/app';
import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { SignInRequestDto } from '@/dtos/auth/SignInRequest.dto';
import { SignUpRequestDto } from '@/dtos/auth/SignUpRequest.dto';
import { VerifyEmailRequestDto } from '@/dtos/auth/VerifyEmailRequest.dto';
import { AuthRoute } from '@/routes/auth.route';
import request from 'supertest';
import knex from '../databases/index';

jest.setTimeout(20000);

const route = new AuthRoute();
const app = new App([route]);

beforeAll(async () => {
  await knex('users').del();
});

afterAll(() => {
  jest.clearAllTimers();
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
    it('Should send an email with a recovery code and respond with a 204', async () => {
      const dto = ForgotPasswordRequestDto.fromJson({
        email: 'test@gmail.com',
      });

      const res = await request(app.getServer()).post(`${route.path}/forgot-password`).send(dto);
      expect(res.statusCode).toBe(204);
    });
  });

  /**
   * Check user email verification
   */
  describe('[POST] /auth/verify-email', () => {
    it('Should update the emailVerified property against the user and respond with 200', async () => {
      const dto = VerifyEmailRequestDto.fromJson({
        email: 'test@gmail.com',
        token: '',
      });

      const res = await request(app.getServer()).post(`${route.path}/verify-email`).send(dto);
      expect(res.statusCode).toBe(200);
    });

    it('Should respond with 422 as the request is invalid', async () => {
      const res = await request(app.getServer()).post(`${route.path}/verify-email`).send({});
      expect(res.statusCode).toBe(422);
    });

    it('Should respond with 401 as the token is in the valid format, but invalid for this user', async () => {
      const dto = VerifyEmailRequestDto.fromJson({
        email: 'test@gmail.com',
        token: '',
      });

      const res = await request(app.getServer()).post(`${route.path}/verify-email`).send(dto);
      expect(res.statusCode).toBe(401);
    });

    it('Should respond with 403 as the token is in the valid format, but out of date', async () => {
      const dto = VerifyEmailRequestDto.fromJson({
        email: 'test@gmail.com',
        token: '',
      });

      const res = await request(app.getServer()).post(`${route.path}/verify-email`).send(dto);
      expect(res.statusCode).toBe(403);
    });
  });
});
