const Pool = require('pg').Pool
const pool = new Pool({
  user: 'raanxvubehwrtu',
  host: 'ec2-52-204-157-26.compute-1.amazonaws.com',
  database: 'da9fq9qair8e0h',
  password: '69bd2cd57f2d7edd108d0f7c9831b8bacf5d994015bfb70ef9d8878d4d706660',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;