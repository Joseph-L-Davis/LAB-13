import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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
}
