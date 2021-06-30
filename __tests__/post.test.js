import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Post from '../lib/models/Post.js';


describe('User routes', () => {
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
  
  it('POST a new post', async () => {

    const res = await agent
      .post('/api/v1/posts')
      .send({
        user_id: '2',
        photoUrl: 'URL',
        caption: 'oohlala',
        tags: ['a', 'b']
      });

    expect(res.body).toEqual({
      id: '1',
      userId: '2',
      photoUrl: 'URL',
      caption: 'oohlala',
      tags: ['a', 'b']
    });
  });
  
  it('GET all posts', async () => {
    await agent
      .post('/api/v1/posts')
      .send({
        user_id: '1',
        photoUrl: 'URL',
        caption: 'oohlala',
        tags: ['a', 'b']
      });
      
    const res = await agent.get('/api/v1/posts');

    expect(res.body).toEqual([{
      id: '1',
      userId: '1',
      photoUrl: 'URL',
      caption: 'oohlala',
      tags: ['a', 'b']
    }]);
      
  });

  it('GET post by Id', async () => {
    await agent
      .post('/api/v1/posts')
      .send({
        photoUrl: 'URL',
        caption: 'oohlala',
        tags: ['a', 'b']
      });

    const res = await agent.get('/api/v1/posts/1');

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'URL',
      caption: 'oohlala',
      tags: ['a', 'b']
    });
  });

  it('PATCH post', async () => {
    const post1 = await agent
      .post('/api/v1/posts')
      .send({
        photoUrl: 'URL',
        caption: 'oohlala',
        tags: ['a', 'b']
      });

    const patchedPost = await Post.updateItem(post1.body.id, { caption: 'banana' });

    const res = await agent.get(`/api/v1/posts/${patchedPost.id}`);

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'URL',
      caption: 'banana',
      tags: ['a', 'b']
    });
  });

  it('DELETE post by id', async () => {
    const post1 = await agent
      .post('/api/v1/posts')
      .send({
        photoUrl: 'URL',
        caption: 'oohlala',
        tags: ['a', 'b']
      });

    const res = await Post.deleteItem(post1.body.id);
    agent.delete(`/api/v1/posts/${post1.id}`);

    expect(res.body).toEqual({ 
      id: '1',
      userId: '1',
      photoUrl: 'URL',
      caption: 'banana',
      tags: ['a', 'b'] });
  });
});
