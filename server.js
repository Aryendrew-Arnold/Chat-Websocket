const express = require('express'); // express = function
const app = express();

app.use(express.static('public')); // app irá usar os arquivos estáticos da pasta "public"

const http = require('http').Server(app);
const serverSocket = require('socket.io')(http);

const port = 8000; // porta em que o servidor será executado

http.listen(port, function(){ // escuta o momento em que se conectar ao servidor
    console.log('Servidor iniciado em http://localhost:' + port);
});

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html')
});

const users = {}; // Mapeia userID para nicknames

serverSocket.on('connection', (socket) => {
    console.log('Cliente conectado: ' + socket.id);

    users[socket.id] = socket.id; // Inicializa com o ID do socket como o nickname

    socket.emit('USER CONNECTED', socket.id, users);
    socket.broadcast.emit('NEW USER MSG', socket.id);

    socket.on('CHAT MSG', (msg) => {
        console.log(`Mensagem enviada pelo cliente "${socket.id}": ${msg}`);
        serverSocket.emit('CHAT MSG', msg, socket.id)
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('USER DISCONNECTED', socket.id);
        delete users[socket.id];
    });

    socket.on('FRIEND_NICK', (newNick, userID) => {
        if (!newNick) {
            newNick = userID;
        }
        const oldNick = users[userID];
        users[userID] = newNick;
        socket.broadcast.emit('FRIEND_NAME', newNick, userID, oldNick);
    });
});

/* users é um objeto que armazena o userID como chave e o newNick como valor.
Se newNick estiver vazio, o userID será usado como nickname.
socket.broadcast.emit é usado para enviar o novo nickname a todos os outros clientes
*/