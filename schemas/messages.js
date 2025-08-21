const pool = require("../db/connectpgdb");

const createMessagesTable = async ()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        sender_id INT REFERENCES users(id),
        reciever_id INT REFERENCES users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW());`
    );
    console.log("Created Messages Table.");
}

module.exports = {createMessagesTable};