const {createUsersTable} = require("../schemas/users");
const {createMessagesTable} = require("../schemas/messages");
const {createNotificationsTable} = require("../schemas/notifications");

const initDb = async ()=>{
    await createUsersTable();
    await createMessagesTable();
    await createNotificationsTable();
    console.log("all table initialized");
}

module.exports = initDb;