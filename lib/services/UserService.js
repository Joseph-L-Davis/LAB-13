import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import Post from '../models/Post.js';

export default class UserService {
  static async create({ email, password, profilePhotoUrl }) {
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT));
    return User.insert({ email, passwordHash, profilePhotoUrl });
  }

  static async authorize({ email, password }) {
    const user = await User.findByEmail(email);
    if(!user) {
      throw new Error('Email or Password does not match');
    }

    const matchingPassword = await bcrypt.compare(password, user.passwordHash);
    if(!matchingPassword) {
      throw new Error('Email or Password does not match');
    }

    return user;
  }

  static async createPost({ id,  userId, photoUrl, caption, tags }) {
    // get user id
    const user = await User.findById(id);
    userId = user.id;
    // create a post assigning user id to post
    return Post.insert({ userId, photoUrl, caption, tags });
  }
}
