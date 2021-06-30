import { Router } from 'express';
import User from '../models/User.js';
import UserService from '../services/UserService.js';

const ONE_DAY = 1000 * 60 * 60 * 24;

export default Router()
  .post('/api/v1/auth/signup', async (req, res, next) => {
    UserService.create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY
        });
        res.send(user);
      })
      .catch(next);
  });
