jest.setTimeout(10000);

afterAll(() => {
  jest.clearAllTimers();
});

describe('Roles Tests', () => {
  describe('[GET] /roles', () => {
    it('code: 200, data: an array of role dtos', done => {
      done();
    });
  });

  describe('[GET] /roles/:uuid', () => {
    it('Should return a 404 response', done => {
      done();
    });

    it('code: 200, data: a role dto', done => {
      done();
    });
  });
});
