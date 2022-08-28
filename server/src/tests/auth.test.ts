import { App } from '@/app';
import { SignInRequestDto } from '@/dtos/auth/SignInRequest.dto';
import { SignUpRequestDto } from '@/dtos/auth/SignUpRequest.dto';
import { AuthRoute } from '@/routes/auth.route';
import request from 'supertest';

describe('Auth Tests', () => {
  describe('[POST] /auth/sign-in', () => {
    it('code: 200, data: a user dto and a token', done => {
      const dto = SignInRequestDto.fromJson({
        email: 'test@gmail.com',
        password: 'password',
      });

      const route = new AuthRoute();
      const app = new App([route]);
      return request(app.getServer())
        .post(`${route.path}/sign-in`)
        .send(dto)
        .expect(200)
        .then(res => {
          expect(typeof res.body.token).toBe('string');
          expect(typeof res.body.user.email).toBe('string');
          expect(res.body.user.email).toEqual('test@gmail.com');
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('[POST] /auth/sign-up', () => {
    it('code: 200, data: a user dto and a token', done => {
      const dto = SignUpRequestDto.fromJson({
        email: 'test@gmail.com',
        fullName: 'John Doe',
        password: 'password',
      });

      const route = new AuthRoute();
      const app = new App([route]);
      return request(app.getServer())
        .post(`${route.path}/sign-up`)
        .send(dto)
        .expect(200)
        .then(res => {
          expect(typeof res.body.token).toBe('string');
          expect(typeof res.body.user.email).toBe('string');
          expect(res.body.user.email).toEqual('test@gmail.com');
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
