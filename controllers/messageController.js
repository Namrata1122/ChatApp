const {
    sendMessage,
    messagesExchanged,
    allMessagesBetweenAllUsers
} = require('../services/messageQueries');
const {findUserById} = require('../services/userQueries');

const sendAMessage = async(req,res)=>{
    try{
        const sender = req.body.sender_id;
        const reciever = req.body.reciever_id;
        const message = req.body.content;

        if(!sender || !reciever){
            res.status(400).json({message:"Provide a sender and reciever to send message"});
        }

        const recieverExists = findUserById(reciever);
        if(!recieverExists){
            res.status(400).json({message:"receiver does not exist."})
        }
        if(!message){
            res.status(400).json({message:"Write a message to start chat."});
        }

        const newMessage = sendMessage(sender,reciever,message);

        res.status(200).json({message:"Message sent successfully",sender,reciever,message})
    }catch(err){
        console.log(err);
    }
}
const viewChatHistory = async(req,res)=>{
    try{
        const sender = req.body.sender_id;
        const reciever = req.body.reciever_id
        const chatHistory = await messagesExchanged(sender,reciever);
        res.status(200).json({chatHistory});
    }catch(err){
        console.log(err);
    }
}
const viewAllMessagesBetweenAllUsers = async(req,res)=>{
    const allmessageseversent = await allMessagesBetweenAllUsers();
    res.status(200).json({allmessageseversent});
}

module.exports = {
    sendAMessage,
    viewChatHistory,
    viewAllMessagesBetweenAllUsers
};