import { App } from '@/app';
import { ForgotPasswordRequestDto } from '@/dtos/auth/ForgotPasswordRequest.dto';
import { SignInRequestDto } from '@/dtos/auth/SignInRequest.dto';
import { SignUpRequestDto } from '@/dtos/auth/SignUpRequest.dto';
import { AuthRoute } from '@/routes/auth.route';
import request from 'supertest';

jest.setTimeout(10000);

describe('Auth Tests', () => {
  describe('[POST] /auth/sign-up', () => {
    it('Create a new user and return a user dto and an auth token', done => {
      const dto = SignUpRequestDto.fromJson({
        email: 'test@gmail.com',
        fullName: 'John Doe',
        password: 'password',
      });

      const route = new AuthRoute();
      const app = new App([route]);

      request(app.getServer())
        .post(`${route.path}/sign-up`)
        .send(dto)
        .expect(200)
        .then(res => {
          expect(typeof res.body.data.token).toBe('string');
          expect(typeof res.body.data.user.email).toBe('string');
          expect(res.body.data.user.email).toEqual('test@gmail.com');
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('[POST] /auth/sign-in', () => {
    it('Return a user dto and an auth token', done => {
      const dto = SignInRequestDto.fromJson({
        email: 'test@gmail.com',
        password: 'password',
      });

      const route = new AuthRoute();
      const app = new App([route]);

      request(app.getServer())
        .post(`${route.path}/sign-in`)
        .send(dto)
        .expect(200)
        .then(res => {
          expect(typeof res.body.data.token).toBe('string');
          expect(typeof res.body.data.user.email).toBe('string');
          expect(res.body.data.user.email).toEqual('test@gmail.com');
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('[POST] /auth/forgot-password', () => {
    it('Should send an email with a recovery code', () => {
      const dto = ForgotPasswordRequestDto.fromJson({
        email: 'test@gmail.com',
      });

      const route = new AuthRoute();
      const app = new App([route]);

      request(app.getServer()).post(`${route.path}/forgot-password`).send(dto).expect(204);
    });
  });
});
