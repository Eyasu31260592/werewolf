import { motion } from "framer-motion";
import { useState } from 'react';
import { socket } from '../utils/socket';
import { useUser } from '@clerk/clerk-react';
import { useToast } from '../hooks/useToast';
import axios from 'axios';
import PlayerOnLobbyList from './PlayerOnLobbyList';
import { useEffect } from 'react';


export default function HostStartButton() {
  const {user} = useUser();
  const host = user?.fullName;
  const id = user?.id;
  const {success , error} = useToast();

  const [gameStartByMe, setGameStartByMe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const start_invite = async () => {

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/start-game`,{
        id:id,
        host : host,
      })
      success('Game started!');
      setIsLoading(true);
    } catch (error) {
      console.error('Error starting game:', error.message);
    }finally{
       setIsLoading(false);
    }
  }



  useEffect(()=>{
    const checkGameStart = async () => {
      try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/game-start-by-me-db/${id}`);
  
        setIsLoading(false);
      setGameStartByMe(response.data.started)
      
    } catch (err) {
      // error(err.message);
    }finally{
      setIsLoading(false)
    }
    }
    
    checkGameStart();
     
  },[])

  if(isLoading){
    return <>
    <div className="h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
    
    </>
  }
  return (
    <>
    {!gameStartByMe  ?
    <div className="h-screen flex items-center justify-center"> 
       <div className="flex flex-col items-center justify-center w-full space-y-4 -mt-40"> 
      <p className="text-xl md:text-2xl text-yellow-300 font-semibold text-center max-w-sm">
        Initiate Game! Let the Deception Begin!
      </p>
      <motion.button
        onClick={() => {socket.emit('invite_palyer',({message:"game sarted"})); setGameStartByMe(true); start_invite() }}
        className="
          bg-gradient-to-r from-yellow-500 to-yellow-600 text-black
          font-bold text-xl py-4 px-10 rounded-full
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          transform hover:scale-105
          focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-70
          flex items-center justify-center space-x-4
          min-w-[180px] sm:min-w-[200px]
        "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-4xl">▶️</span>
        <span>Invite palyer</span> {/* Changed button text to "Start" */}
      </motion.button>
    </div>
    </div>
    
    :
    <PlayerOnLobbyList  />
    }
   
    </>
    
   
  );
}
