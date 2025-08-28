const pool = require("../db/connectpgdb");

const createUsersTable = async ()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT,
        created_at TIMESTAMP DEFAULT NOW()
        );`
    );
    console.log("Created users table");
}

module.exports = {createUsersTable}