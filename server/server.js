const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./db.js');
const {startInvite, getGameList, gameStartByMeDb,createPlayer,PlayerInTheGame,playerList,getGameId,palyerListForHost,deleteGame, updatePlayerRole,getSelfInfo,getPlayerToKill, savePlayer , killPlayer} = require('./controller/game.controller.js');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || '*', // Fallback to '*' in dev
    credentials: true
  }
});
connectDB();

io.on('connection', (socket) => {
    socket.on('invite_palyer',(data)=>{
        console.log(data)
        socket.broadcast.emit('invitation_start',({message:'game_started'}))
    })
    socket.on('new_player_join',(data)=>{
        socket.broadcast.emit('new_player_join')
    })
    socket.on('game-cancled',()=>{
        socket.broadcast.emit('game-cancled',({message:'game cancled'}))
    })
    socket.on('game_Started',()=>{
        socket.broadcast.emit('game_Started',({message:'game_Started'}))
    })
    socket.on('refresh',()=>{
        socket.broadcast.emit('refresh')
    })
    /* japan */
    socket.on('JapaneseMafia',()=>{
        socket.broadcast.emit('JapaneseMafia',({message:'JapaneseMafia'}))
    })
    socket.on('japaneseMafia_want_to_kill',(player)=>{
        socket.broadcast.emit('japaneseMafia_want_to_kill',({player}))
    })

    /* werewolf */
    socket.on('werewolf',()=>{
        socket.broadcast.emit('werewolf',({message:'werewolf'}))
    })
    socket.on('werewolf_want_to_kill',(player)=>{
        socket.broadcast.emit('werewolf_want_to_kill',({player}))
    })
    /* serialKiller */
    socket.on('serialKiller',()=>{
        socket.broadcast.emit('serialKiller',({message:'werewolf'}))
    })
    socket.on('werewolf_want_to_kill',(player)=>{
        socket.broadcast.emit('werewolf_want_to_kill',({player}))
    })
    /* italianMafia */
    socket.on('italianMafia',()=>{
        socket.broadcast.emit('italianMafia',({message:'italianMafia'}))
    })
    socket.on('werewolf_want_to_kill',(player)=>{
        socket.broadcast.emit('werewolf_want_to_kill',({player}))
    })
    /* doctor */
    socket.on('doctor',()=>{
        socket.broadcast.emit('doctor',({message:'italianMafia'}))
    })
    socket.on('doctor_want_to_save',(player)=>{
        socket.broadcast.emit('doctor_want_to_save',({player}))
    })
    /* detective */
    socket.on('detective',()=>{
        socket.broadcast.emit('detective',({message:'detective'}))
    })
    socket.on('detective_guess',(player)=>{
        socket.broadcast.emit('detective_guess',({player}))
    })
});

app.get('/',(req,res)=>{
    res.json({message:"hi"})
})
app.post('/api/start-game',startInvite)
app.get('/api/get-game-list', getGameList)
app.get('/api/game-start-by-me-db/:id', gameStartByMeDb)
app.post('/api/create-player', createPlayer)
app.get('/api/player-in-the-game/:id', PlayerInTheGame)
app.get('/api/player-list-for-player/:id', playerList)
app.get('/api/player-list-for-host/:id', palyerListForHost)
app.get('/api/get-game-id/:id', getGameId)
app.delete('/api/delete-game/:id', deleteGame)
app.post('/api/assign-role', updatePlayerRole)
app.get('/api/self-info/:id', getSelfInfo)
app.get('/api/get-player-to-kill/:ids', getPlayerToKill)
app.post('/api/save-player/:id', savePlayer)
app.post('/api/kill-player/:id', killPlayer)


server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
