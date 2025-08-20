// live connection to the server
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit',(e)=>{
    e.preventDefault(); //prevents html default behaviour of refreshing the page
    if(input.value){
        socket.emit('chat message',input.value);
        input.value = '';
    }
});