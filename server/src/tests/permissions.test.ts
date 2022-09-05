jest.setTimeout(10000);

afterAll(() => {
  jest.clearAllTimers();
});

describe('Permission Tests', () => {
  describe('[GET] /permissions', () => {
    it('Should return a 404 response', done => {
      done();
    });

    it('code: 200, data: an array of permission dtos', done => {
      done();
    });
  });

  describe('[GET] /permissions/:uuid', () => {
    it('code: 200, data: a permission dto', done => {
      done();
    });
  });
});
