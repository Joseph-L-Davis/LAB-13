import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';


describe('User routes', () => {
  beforeAll(async () => {
    const user = { email: 'email', password: 'password' };
    await request.agent(app).post('/api/v1/auth/signup').send(user);
    return setup(pool);
  });
  it('POST a new post', async () => {
    return;
  });

  
});
