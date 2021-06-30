import pool from '../utils/pool.js';

export default class User {
    id;
    email;
    passwordHash;

    constructor(row){
      this.id = row.id;
      this.email = row.email;
      this.passwordHash = row.password_hash;
    }

}
