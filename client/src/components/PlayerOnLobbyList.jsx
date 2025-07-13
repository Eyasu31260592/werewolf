import axios from 'axios'
import { useUser } from '@clerk/clerk-react';
import { socket } from '../utils/socket';
import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import AssignRoles from './AssignRole';


 

const PlayerOnLobbyList = () => {
  const {user} = useUser();
  const id = user?.id;
   const role = user.publicMetadata.role;
     const {success , error, warn} = useToast();
     const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState(true);
  const [playerListForPlayer , setPlayerListForPlayer] = useState([])
  const [playerListForHost , setPlayerListForHost] = useState([])
  const [showAssignRole , setshowAssignRole] = useState(false)


  const PlayerListForPlayer = async () => {
    try {

      if (role !== 'host'){
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-game-id/${id}`);
            const currentGameId = res.data.gameId;
             const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/player-list-for-player/${currentGameId}`)
            setPlayerListForPlayer(data)
      }else{
      const res2 = await axios.get(`${import.meta.env.VITE_API_URL}/api/player-list-for-host/${id}`)
      setPlayerListForHost(res2.data)
      
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }
      // PlayerListForPlayer()

  const deleteGame = async() => {

    try {
      const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete-game/${id}`);
      success(data.message)
      socket.emit('game-cancled');
      navigate('/')
    } catch (err) {
      error(err.message)
    }
  }   


  useEffect(()=>{
    PlayerListForPlayer()
    socket.on('new_player_join',()=>{
    PlayerListForPlayer()
    })

    socket.on('game-cancled',(data)=>{
      warn(data.message);
      navigate('/')
    });
    socket.on('game_Started',(data)=>{
      navigate('/game-filed');
      
    });

    return () => {
    socket.off('game-cancled'); 
  };
  },[socket])
  
  if(isLoading){
    return <>
    <div className="h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
    
    </>
  }

  return (
  
    <>
    {role !== 'host' ? (
      <div className="-mt-8 px-4 max-w-3xl mx-auto ">
      <h2 className="text-center text-2xl font-bold text-yellow-400 mb-6">
        🧑‍🤝‍🧑 Players in the Lobby
      </h2>

      {playerListForPlayer.length === 0 ? (
        <div className="text-center text-yellow-300 text-lg bg-yellow-500 bg-opacity-10 p-6 rounded-xl shadow">
          No players have joined yet...
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {playerListForPlayer.map((player, index) => (
            <motion.div
              key={player._id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center bg-yellow-500 bg-opacity-10 border border-yellow-400 px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              {/* Role number box */}
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 text-black font-bold text-xl rounded-md mr-4">
                {index + 1}
              </div>

              {/* Profile and name */}
              <div className="flex items-center gap-4">
                <img
                  src={player.profilePic}
                  alt={player.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                />
                <h3 className="text-lg font-semibold text-white">{player.name.split(" ")[0]}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
    ) : (
      
    <div className="-mt-8  px-4 max-w-3xl mx-auto">
      <h2 className="text-center text-2xl font-bold text-yellow-400 mb-6">
        🧑‍🤝‍🧑 Players in the Lobby
      </h2>

      {playerListForHost.length === 0 ? (
        <div className="text-center text-yellow-300 text-lg bg-yellow-500 bg-opacity-10 p-6 rounded-xl shadow">
          No players have joined yet...
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-8" onClick={() => setshowAssignRole(false)}>
          {playerListForHost.map((player, index) => (
            <motion.div
              key={player._id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center bg-yellow-500 bg-opacity-10 border border-yellow-400 px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              {/* Number box */}
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 text-black font-bold text-xl rounded-md mr-4">
                {index + 1}
              </div>

              {/* Profile and name */}
              <div className="flex items-center gap-4">
                <img
                  src={player.profilePic}
                  alt={player.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                />
                <h3 className="text-lg font-semibold text-white">{player.name.split(" ")[0]}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-4">
       
       <button
          
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow transition-all"
          onClick={()=> setshowAssignRole(true)}
        >
          Assigne Role 📝 
        </button>
        
         <button
          
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow transition-all"
          onClick={()=>navigate('/game-filed')}
        >
          go to game filed 👉
        </button>
        

        <button
        onClick={deleteGame}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow transition-all"
        >
         Cancel Game
        </button>
      </div>
    </div>
    )}

    {
      showAssignRole && < AssignRoles/>
    }
    </>
  )
}

export default PlayerOnLobbyList