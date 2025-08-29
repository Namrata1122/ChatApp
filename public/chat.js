// live connection to the server
const socket = io();

const loggedInUser = JSON.parse(localStorage.getItem("user"));
const loggedInUserId = loggedInUser.id ;
console.log(loggedInUser)

socket.emit("Register",loggedInUserId);

let selectedUserId = null;

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const userList = document.getElementById('userList');
const chatHeader = document.getElementById('chatHeader')

// Users list
async function loadUsers(){
    const res = await fetch("/users");
    const data = await res.json();
    console.log("fetched users: ",data);
    const users = data.allusers;

    userList.innerHTML = '';
    users.forEach(user =>{
        const li = document.createElement('li');
        li.textContent = user.username;
        li.addEventListener('click',()=>selectUser(user));
        userList.appendChild(li);
    })
}

// select user to chat
async function selectUser(user){
    selectedUserId = user.id;
    if(selectedUserId === loggedInUserId){
        chatHeader.textContent = `chat with ${user.username} (Yourself)`;
    }else{
        chatHeader.textContent = `chat with ${user.username}`;
    }
    
    messages.innerHTML = '';

    // chat history
    const res = await fetch("/messages/chathistory",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({sender_id:loggedInUser.id,reciever_id:selectedUserId})
    });
    const data = await res.json();
    console.log("Loaded History :",data);
    const msgs = data.messages || data.chatHistory ||[];
    msgs.forEach(msg =>{
        const isMe = Number(msg.sender_id) ===  Number(loggedInUserId);
        addMessage(msg.content, isMe? 'me':'them');
    });
}

form.addEventListener('submit',(e)=>{
    e.preventDefault(); //prevents html default behaviour of refreshing the page
    if(input.value && selectedUserId){
        const msgObj = {
            sender_id:loggedInUserId,
            reciever_id:selectedUserId,
            content:input.value
        };

        socket.emit('private message',msgObj);
        addMessage(input.value, 'me');
        input.value = '';
    }
});

socket.on('private message',(msgObj)=>{
    if(msgObj.sender_id === selectedUserId || msgObj.reciever_id === selectedUserId){
        addMessage(msgObj.content,msgObj.sender_id === loggedInUserId?'me':'them')
    }
})

function addMessage(text,who){
    const item = document.createElement('li');
    item.textContent= text;
    item.className = who;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
    // window.scrollTo(0,document.body.scrollHeight);
}

loadUsers();