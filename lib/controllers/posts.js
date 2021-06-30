import { Router } from 'express';
import UserService from '../services/UserService.js';
import ensureAuth from '../middleware/ensure-auth.js';

export default Router()
  .post('/api/v1/posts', ensureAuth, async (req, res, next) => {
    UserService.createPost({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
  });
