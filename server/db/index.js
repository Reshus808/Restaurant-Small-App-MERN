const {Pool} = require('pg');
// require("dotenv").config();

// const DATABASE_URL = process.env.DATABASE_URL || "";
// const pgPool = new Pool({connectionString: DATABASE_URL});
//
// export default pgPool

const pool = new Pool();
module.exports = {
  query: (text, params) => pool.query(text, params),
};