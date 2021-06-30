import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('Comment routes', () => {
  const agent = request.agent(app);
  beforeEach(async () => {
    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'this is an email',
        password: 'password',
        profilePhotoUrl: 'oohLookAtMe'
      });
    return setup(pool);
  });

  it('POST comment', async () => {
    const res = await agent
      .post('/api/v1/comments')
      .send({
          
      });
  });

});
