import pool from '../utils/pool.js';
import jwt from 'jsonwebtoken';

export default class User {
    id;
    email;
    passwordHash;
    profilePhotoUrl;

    constructor(row){
      this.id = row.id;
      this.email = row.email;
      this.passwordHash = row.password_hash;
      this.profilePhotoUrl = row.profile_photo_url;
    }

    static async insert({ email, passwordHash, profilePhotoUrl }) {
      const { rows } = await pool.query(
        `INSERT INTO users (email, password_hash, profile_photo_url)
            VALUES ($1, $2, $3)
            RETURNING *`,
        [email, passwordHash, profilePhotoUrl]
      );
      return new User(rows[0]);
    }

    static async findByEmail(email) {
      const { rows } = await pool.query(
        `SELECT * FROM users
            WHERE email = $1
            RETURNING *`,
        [email]
      );
      if(!rows[0]) return null;
      return new User(rows[0]);
    }

    //  Assign token to User, set expiration
    authToken() {
      return jwt.sign({ ...this }, process.env.SECRET, {
        expiresIn: '24h'
      });
    }

    // Send only id and email, no hashPass
    toJSON() {
      return {
        id: this.id,
        email: this.email,
        profilePhotoUrl: this.profilePhotoUrl
      };
    }

}
