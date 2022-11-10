const Pool = require('pg').Pool

const pool = new Pool({
  user: 'vneaorxtgsgofs',
  host: 'ec2-44-205-177-160.compute-1.amazonaws.com',
  database: 'dae5uh1mliddj8',
  password: '7eb74dc9e0b132e8f12adceaaa76fb1626b170e37838265d7590b2131ca85c51',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;