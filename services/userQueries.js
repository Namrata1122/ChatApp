const pool = require('../db/connectpgdb');

const findUserByUsername = async(username)=>{
    const result = await pool.query("SELECT * from users WHERE username = $1",[username]);
    return result.rows[0];
}

const findUserByEmail = async(email)=>{
    const result = await pool.query("SELECT * from users WHERE email = $1",[email]);
    return result.rows[0];
}

const findUserById = async(Id)=>{
    const result = await pool.query("SELECT * from users WHERE id = $1",[Id]);
    return result.rows[0];
}

const insertNewUser =  async(username, email, password)=>{
    const result = await pool.query(`
        INSERT INTO users(username, email, password) 
        VALUES ($1,$2,$3)
        RETURNING id, username,email`,[username,email,password]
    );
    return result.rows[0];
}

const allUsers = async()=>{
    const result = await pool.query("Select * from users");
    return result.rows;
}

module.exports = {
    findUserByEmail,
    findUserByUsername,
    findUserById,
    insertNewUser,
    allUsers
};