import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inkubator',
});

export default pool.promise();
