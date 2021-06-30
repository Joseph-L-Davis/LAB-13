import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';


describe('User routes', () => {
  const agent = request.agent(app);
  beforeAll(async () => {
    
    return setup(pool);
  });
  
  it('POST a new post', async () => {
    const user = await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'this is an email',
        password: 'password',
        profilePhotoUrl: 'oohLookAtMe'
      });
    console.log(user.body);

    const res = await agent
      .post('/api/v1/posts')
      .send({
        user_id: '1',
        photoUrl: 'URL',
        caption: 'oohlala',
        tags: ['a', 'b']
      });

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'URL',
      caption: 'oohlala',
      tags: ['a', 'b']
    });
  });  
});
