jest.setTimeout(10000);

afterAll(() => {
  jest.clearAllTimers();
});

describe('Permission Group Tests', () => {
  describe('[GET] /permission-groups', () => {
    it('code: 200, data: an array of permission group dtos', done => {
      done();
    });
  });

  describe('[GET] /permission-group/:uuid', () => {
    it('code: 200, data: a permission group dto', done => {
      done();
    });
  });
});
