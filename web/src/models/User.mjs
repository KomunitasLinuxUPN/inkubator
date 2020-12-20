import db from '../utils/db.mjs';

class User {
  constructor(id, name, email, hashedPassword, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
  }

  save() {
    return db.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [this.name, this.email, this.hashedPassword, this.role],
    );
  }

  static fetchAll() {
    return db.execute('SELECT id, name, email, role FROM users');
  }

  static findByEmail(email) {
    return db.execute(
      'SELECT * FROM users WHERE users.email = ? LIMIT 1',
      [email],
    );
  }
}

export default User;
