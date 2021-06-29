import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('User routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('signup user with POST', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'this is an email',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'this is an email',
    });
  });
});
