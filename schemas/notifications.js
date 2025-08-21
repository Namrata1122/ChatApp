const pool = require("../db/connectpgdb");

const createNotificationsTable = async ()=>{
    await pool.query(`
        CREATE TABLE IF NOT EXISTS notifications(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW());`
    );
    console.log("Created notifications table");
}

module.exports = {createNotificationsTable};