// live connection to the server
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit',(e)=>{
    e.preventDefault(); //prevents html default behaviour of refreshing the page
    if(input.value){
        socket.emit('chat message',input.value);
        input.value = '';
    }
});

socket.on('chat message',(msg)=>{
    const item = document.createElement('li');
    item.textContent= msg;
    messages.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);
})