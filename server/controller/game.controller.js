const Game = require('../model/gameInfo.js')
const Player = require('../model/player.model.js')

const startInvite = async (req,res)=>{
     const {host, id,start} = req.body;
    try {
        const newGame = await Game.create({
            _id:id,
            hostName: host,
            start: start
        });
        return res.status(201).json({
            message: 'game started',
            game: newGame
        })
       

    } catch (error) {
        console.error('Error starting game:', error);
        return res.status(500).json({ message: error.message });
    }
}

const getGameList = async (req,res) => {
      try {
    const games = await Game.find(); 
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getSelfInfo = async (req,res) => {
    const {id} = req.params;
      try {
    const info = await Player.findById(id); 
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const gameStartByMeDb = async (req,res)=> {
    const { id } = req.params;

    try {
        const game = await Game.findById(id);
    if (game) {
      return res.status(200).json({ started: true , message: 'Game found' });
    }else{
        return res.status(404).json({ started: false, message: 'Game not found' });
    }
    } catch (error) {
         res.status(500).json({ started: false, message: 'Server error' });
    }
}

const createPlayer = async (req,res) => {
    const {name, profilePic, gameId , _id} = req.body; 
    try {
        const newPlayer = await Player.create({
            _id,
            profilePic,
            gameId,
            name
        }) 
        return res.status(200).json({message: 'you have join the game'})
    } catch (error) {
        console.error('Error starting game:', error);
        return res.status(500).json({ message: error.message });
    }
    

}

const PlayerInTheGame = async(req,res) =>{
    const {id} = req.params;
    try {
        const player = await Player.findById(id);
        if(player){
             return res.status(200).json({ inTheGame: true });
        } else{
             return res.status(200).json({ inTheGame: false });
        }
    } catch (error) {
         res.status(500).json({ started: false, message: 'Server error' });
    }
}

const getGameId = async (req,res) => {
    const { id } = req.params;

  try {
    const player = await Player.findById(id); 
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    return res.status(200).json({ gameId: player.gameId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const playerList = async (req,res) => {
    const {id} = req.params;
     try {
    const players = await Player.find({ gameId: id }); // 🔍 find all players with the same gameId
    return res.status(200).json(players);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const palyerListForHost = async(req,res) => {
   const {id} = req.params;
     try {
    const players = await Player.find({ gameId: id }); // 🔍 find all players with the same gameId
    return res.status(200).json(players);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteGame = async(req,res) => {
  const {id} = req.params;

  try {
    const player = await Player.deleteMany({gameId: id});
    const game = await Game.findByIdAndDelete({_id: id})
    return res.status(200).json({message: "game cancled"});
  } catch (error) {
    return res.status(500).json({ message: error.message });    
  }
}

const updatePlayerRole = async (req,res) => {

  const {updatedPlayerInfo} = req.body; 
  try {
    for(const player of updatedPlayerInfo){
      await Player.findOneAndUpdate(
        { _id: player._id},
        {
          role: player.role,
          mate: player.mate || false,
          mateInfo: player.mateInfo || null,
        }
      )
    }
    res.status(200).json({ message: 'Players updated successfully' });
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message)
  }
}

const getPlayerToKill = async (req, res) => {

  const  ids  = req.params.ids.split(',');

  try {
  const players = await Player.find({
    _id: {$nin: ids},
    dead: false
  })
  if (!players || players.length === 0) {
      return res.status(404).json({ message: 'No players found or all are excluded' });
    }

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}

const savePlayer = async (req,res)=> {

  const {id} = req.params;
  try {
    const player = await Player.findByIdAndUpdate({
      _id: id
    },{dead: false})

    res.status(200).json(player);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}
const killPlayer = async (req,res)=> {

  const {id} = req.params;
  try {
    const player = await Player.findByIdAndUpdate({
      _id: id
    },{dead: true})

    res.status(200).json(player);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
}




module.exports = {startInvite , getGameList,gameStartByMeDb , createPlayer,PlayerInTheGame, playerList, getGameId,palyerListForHost,deleteGame,updatePlayerRole,getSelfInfo,getPlayerToKill, savePlayer,killPlayer}

