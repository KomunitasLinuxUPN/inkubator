import db from '../utils/db.mjs';

class User {
  constructor(id, email, hashedPassword, role) {
    this.id = id;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
  }

  save() {
    return db.execute(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
      [this.email, this.hashedPassword, this.role],
    );
  }

  static fetchAll() {
    return db.execute('SELECT id, email, role FROM users');
  }

  static findById(id) {
    return db.execute('SELECT * FROM users WHERE users.id = ?', [id]);
  }

  static findByEmail(email) {
    return db.execute('SELECT * FROM users WHERE users.email = ?', [email]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM users WHERE users.id = ?', [id]);
  }
}

export default User;
