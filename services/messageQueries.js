const pool = require('../db/connectpgdb');

const sendMessage = async(sender_id,reciever_id,content)=>{
    try{const result = await pool.query(`INSERT INTO messages(sender_id,reciever_id,content) 
        values ($1, $2, $3)
        RETURNING id,sender_id,reciever_id,content`,[sender_id,reciever_id,content]);
    return result.rows[0];}
    catch(err){
        console.log("Error while sending message",err);
    }
}

const messagesExchanged = async(sender_id,reciever_id)=>{
    try{
        const result = await pool.query(`SELECT * from messages 
            where reciever_id = $1 AND sender_id = $2`,[reciever_id,sender_id]);
        return result.rows;
    }catch(err){
        console.log("error while checking history of exchanged messages between two users",err);
    }
}

const allMessagesBetweenAllUsers = async()=>{
    try{
        const result = await pool.query(`SELECT * from messages`);
        return result.rows;
    }catch(err){
        console.log("Checking all messages between all users",err);
    }
}

module.exports={
    sendMessage,
    messagesExchanged,
    allMessagesBetweenAllUsers
};