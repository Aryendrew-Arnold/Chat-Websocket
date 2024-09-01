$(function(){
    const socket = io();

    const input = document.querySelector('#input');
    const msgDiv = document.querySelector('#msg');
    const status = document.querySelector('.user-div');
    const nickname = document.querySelector('.nickname');
    const nickBtn = document.querySelector('.btn-change-nick');
    let userID;
    let userNick = '';
    const users = {}; // Mapeia userID para nicknames
    
    $('#form').submit(function(e) {
        if (input.value !== '') {
            if (userNick === '') {
                userNick = userID;
                nickname.innerHTML = `${userNick}`;
                nickBtn.innerText = 'Change';
            }
            e.preventDefault();
            socket.emit('CHAT MSG', input.value);
            input.value = '';
            scrollToBottom(); // Rolar para baixo após enviar mensagem
        } else {
            e.preventDefault();
        };
    });

    socket.on('CHAT MSG', (msg, user) => {
        const displayName = users[user] || user;
        if (user === userID) {
            msgDiv.innerHTML += `<li><div class="user"><h4>${userNick}:</h4> ${msg}</div></li>`;
        } else {
            msgDiv.innerHTML += `<li><div class="not-user"><h4>${displayName}:</h4> ${msg}</div></li>`;
        }
        scrollToBottom(); // Rolar para baixo após enviar mensagem
    });

    socket.on('USER CONNECTED', (user, usersList) => {
        status.innerHTML += `<p>${user}</p>`;
        userID = user;
        Object.assign(users, usersList);
    });

    nickBtn.addEventListener('click', (e) => {
        nickname.innerHTML = `<input type="text" autofocus placeholder="Set your nickname">`;
        
        const confirmBtn = document.createElement('button');
        confirmBtn.classList.add('margin-btn');
        confirmBtn.innerText = 'Confirm';
        nickname.insertAdjacentElement('afterend', confirmBtn);
        
        nickBtn.classList.add('hidden');
        
        confirmBtn.addEventListener('click', (e2) => {
            e2.preventDefault();
            
            const input = nickname.querySelector('input');
            userNick = input.value || userID;
            
            nickname.innerHTML = `${userNick}`;
            nickBtn.classList.remove('hidden');
            nickBtn.classList.add('margin-btn');
            confirmBtn.remove();
            nickBtn.innerText = 'Change';
    
            socket.emit('FRIEND_NICK', userNick, userID);
        });
    });

    socket.on('FRIEND_NAME', (newName, userID, oldNick) => {
        let previousNick = users[userID] || oldNick || userID;
        users[userID] = newName;
        if (previousNick !== newName) {
            msgDiv.innerHTML += `<li><div class="not-user"><strong>${previousNick}</strong> <p>changed his nickname to</p> <strong>${newName}.</strong></div></li>`;
            scrollToBottom(); // Rolar para baixo após enviar mensagem
        };
    });

    socket.on("NEW USER MSG", (user) => {
        msgDiv.innerHTML += `<li><div class="not-user new-member"><strong>${user} connected to the chat.</strong></div></li>`;
        scrollToBottom(); // Rolar para baixo após enviar mensagem
    });

    socket.on('USER DISCONNECTED', (user) => {
        if (!users[user]) {
            msgDiv.innerHTML += `<li><div class="not-user user-disconected"><strong>${user} disconnected.</strong></div></li>`;
        } else {
            msgDiv.innerHTML += `<li><div class="not-user user-disconected"><strong>${users[user]} disconnected.</strong></div></li>`;
        }
        delete users[user];
        scrollToBottom(); // Rolar para baixo após enviar mensagem
    });

    function scrollToBottom() {
        msgDiv.scrollTop = msgDiv.scrollHeight;
    }
});
