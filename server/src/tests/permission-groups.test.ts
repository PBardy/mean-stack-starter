import { App } from '@/app';
import { PermissionGroupsRoute } from '@/routes/permission-groups.route';
import request from 'supertest';

jest.setTimeout(10000);

const route = new PermissionGroupsRoute();
const app = new App([route]);

afterAll(() => {
  jest.clearAllTimers();
});

describe('Permission Group Tests', () => {
  describe('[GET] /permission-groups', () => {
    it('Should return an array of permission group dtos', async () => {
      const res = await request(app.getServer()).get(`${route.path}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeTruthy();
      expect(res.body?.data?.length).toBeTruthy();
    });
  });

  describe('[GET] /permission-group/:uuid', () => {
    it('Should return a 404 response', async () => {
      const res = await request(app.getServer()).get(`${route.path}/fake-uuid`);
      expect(res.statusCode).toBe(404);
    });

    it('Should return a permission group dto', done => {
      done();
    });
  });
});
