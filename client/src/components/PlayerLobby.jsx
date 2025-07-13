import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import { socket } from '../utils/socket';
import { motion } from "framer-motion";
import { useUser } from '@clerk/clerk-react';
import { useToast } from '../hooks/useToast';
import PlayerOnLobbyList from './PlayerOnLobbyList';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import PlayerGameFiled from './PlayerGameFiled';

const PlayerLobby = () => {
      const [games, setGames] = useState([]);
      const [playerIsInTheGame, setPlayerIsInTheGame] = useState(false);
      const [loading, setLoading] = useState(true); 
      const {user} = useUser();  
      const {success , error, warn} = useToast();
      const { currentGameId, setCurrentGameId } = useGame();
      const navigate = useNavigate()
      const [info, setInfo] = useState({});

      const createPlayer = async (currentGameId) => {

        const _id = user?.id
        const profilePic = user?.imageUrl;
        const gameId = currentGameId;
        const name = user?.fullName;
        setCurrentGameId(currentGameId)

        try {
          const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/create-player`, {
            _id,
            profilePic,
            gameId,
            name
          })
          success(data.message)
           socket.emit('new_player_join',()=>{})
        } catch (err) {
          console.log(err.message)
          error(err.message)
        }
      }

      const playerInTheGame = async () => {
        const id = user?.id;

        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/player-in-the-game/${id}`)
        if(data.inTheGame){
          setPlayerIsInTheGame(true)
        }
      }

    

    useEffect(()=>{
        socket.on('invitation_start',(data)=>{
            fetchGames();
        })
        

      const fetchGames = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-game-list`);
        // const res = await axios.get('http://192.168.8.2:5000/api/get-game-list');
        setGames(res.data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
    playerInTheGame();

     socket.on('game-cancled',(data)=>{
            warn(data.message);
            navigate('/')
          });

          return () => {
    socket.off('game-cancled');
  };

    
    },[])

    useEffect(()=>{
        const getSelfInfo = async() => {
           const id = user?.id;
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/self-info/${id}`);
                setInfo(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getSelfInfo();
    },[user])

 
  return (
    <>
    {
      !info.role ?  
      <div className="space-y-6 max-w-2xl mx-auto w-full px-4"> 
      {games.length === 0 ? (
        <motion.p
          className="text-xl text-gray-400 text-center p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎮 No active games found 🎮
        </motion.p>
      ) : !playerIsInTheGame ? (
        games.map((game) => (
          <motion.div
            key={game._id}
            className="
              flex flex-col sm:flex-row justify-between items-center
              p-6 md:p-8 bg-gray-800 bg-opacity-70 rounded-xl shadow-xl
              border border-gray-700 hover:border-yellow-500
              transition-all duration-300 ease-in-out transform hover:scale-[1.01]
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <p className="font-bold text-xl text-yellow-300 mb-1">Host: {game.hostName}</p>
            </div>
            <button
              onClick={()=>{createPlayer(game._id); setPlayerIsInTheGame(true)}}
              className="
                bg-yellow-500 hover:bg-yellow-400 text-black
                font-bold text-lg px-6 py-3 rounded-lg
                transition duration-300 transform hover:scale-105
                shadow-md hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
                w-full sm:w-auto
              "
            >
              Join Game <span className="ml-2">➡️</span>
            </button>
          </motion.div>
        ))
      ): (
        <PlayerOnLobbyList />
      )}
    </div> : navigate('/game-filed')
    }
   
    </>
  );
}

export default PlayerLobby