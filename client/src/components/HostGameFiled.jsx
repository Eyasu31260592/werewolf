import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { socket } from '../utils/socket';
import axios from 'axios';

const HostGameFiled = () => {

      const { user ,isLoaded} = useUser();
      const [showPlayerToKill, setShowPlayerToKill] = useState(false);
      const [playerToKill, setPlayerToKill] = useState([]);
      const [showPlayerToSave, setShowPlayerToSave] = useState(false);
      const [playerToSave, setPlayerToSave] = useState([]);
      const [showPlayerToGuess, setShowPlayerToGuess] = useState(false);
      const [playerToGuess, setPlayerToGuess] = useState([]);

      const [playerList , setPlayerList] = useState([])
      const id = user.id; 

      const call = async (killer)=> {
        socket.emit(killer);
        
      }

      const handleKill  = async(id)=> {
          try {
          const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/kill-player/${id}`);
          console.log(data)
          getPlayers();
        } catch (error) {
          console.log(error)
        }
      }


  
      const handleSave  = async(id)=> {
        try {
          const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/save-player/${id}`);
          console.log(data)
          getPlayers();
        } catch (error) {
          console.log(error)
        }
      }
     


      useEffect(()=> {
          socket.on('japaneseMafia_want_to_kill',(player)=>{
            setPlayerToKill(player.player)
            setShowPlayerToKill(true);
          
          })
          socket.on('doctor_want_to_save',(player)=>{
            setPlayerToSave(player.player)
            setShowPlayerToSave(true);
          
          })
          socket.on('detective_guess',(player)=>{
            setPlayerToGuess(player.player)
            setShowPlayerToGuess(true);
          
          })

          return () => socket.off('japaneseMafia_want_to_kill');
      },[socket])
      

       const getPlayers = async () => {
            try {
            const {data} =  await axios.get(`${import.meta.env.VITE_API_URL}/api/player-list-for-host/${id}`)
            setPlayerList(data)
            
          } catch (error) {
            console.log(error);
          }
          }
    
        useEffect(()=>{

          getPlayers()
        },[])
      if (!isLoaded) {
        return (
          <div className="h-screen flex justify-center items-center ">
            <div className="animate-spin h-10 w-10 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
          </div>
        );
      }
  return (

    < div className='bg-gray-900  '>
   {showPlayerToKill && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Player want to kill: <span className="text-red-600">{playerToKill?.name}</span>
      </h2>

      <div className="flex justify-center space-x-4">
       {/*  <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          onClick={(handleKill)}
        >
          Kill
        </button> */}
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
          onClick={()=>setShowPlayerToKill(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
   {showPlayerToSave && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        doctor want to Save: <span className="text-green-600">{playerToSave?.name}</span>
      </h2>

      <div className="flex justify-center space-x-4">
        {/* <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          onClick={(handleSave)}
        >
          Save
        </button> */}
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
          onClick={()=>setShowPlayerToSave(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
   {showPlayerToGuess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Detective Guess <span className="text-green-600">{playerToGuess?.name}</span> as Killer
      </h2>

      <div className="flex justify-center space-x-4">
       {/*  <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          onClick={(handleGuess)}
        >
          Right
        </button> */}
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
          onClick={()=>setShowPlayerToGuess(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


   <div className='flex flex-col gap-6 p-6 bg-gray-900 rounded-lg shadow-xl max-w-4xl mx-auto '>
      {/* Role-Calling Actions */}
      <div className='flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4'>
        <h3 className='col-span-full text-xl font-semibold text-white mb-2 text-center'>Call Roles for Night Actions</h3>
        {['JapaneseMafia', 'werewolf', 'serialKiller', 'italianMafia', 'doctor', 'detective'].map((role) => (
          <button
            key={role}
            onClick={() => call(role)}
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'
          >
            Call {role.replace(/([A-Z])/g, ' $1').trim()} {/* Makes "JapaneseMafia" -> "Japanese Mafia" */}
          </button>
        ))}
      </div>

      {/* Separator for better visual grouping on larger screens */}
      <div className='hidden md:block w-px bg-gray-700'></div>

       <div className="p-6 bg-gray-900 rounded-xl shadow-md">
  <h2 className="text-2xl text-center font-bold text-white mb-6">Werewolf Game - Player Status</h2>

  <div className="w-full overflow-x-auto">
  <table className="min-w-max w-full border-collapse rounded-lg overflow-hidden text-white text-sm">
    <thead className="bg-gray-800 uppercase tracking-wider">
      <tr>
        <th className="px-4 py-3 text-left whitespace-nowrap">Name</th>
        <th className="px-4 py-3 text-left whitespace-nowrap">Role</th>
        <th className="px-4 py-3 text-left whitespace-nowrap">Status</th>
        <th className="px-4 py-3 text-left whitespace-nowrap">Actions</th>
      </tr>
    </thead>

    <tbody>
      {playerList.map((player) => (
        <tr
          key={player._id}
          className={`transition duration-300 ease-in-out ${
            player.dead ? 'bg-red-900/80' : 'bg-green-900/80'
          }`}
        >
          <td className="px-4 py-3 font-semibold whitespace-nowrap">
            {player.name.split(" ")[0]}
          </td>
          <td className="px-4 py-3 capitalize whitespace-nowrap">{player.role}</td>
          <td className="px-4 py-3 font-bold whitespace-nowrap">
            <span className={player.dead ? 'text-red-300' : 'text-green-300'}>
              {player.dead ? 'Dead 💀' : 'Alive 🧍'}
            </span>
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleKill(player._id);
                  socket.emit('refresh');
                }}
                disabled={player.dead}
                className="px-3 py-1 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white"
              >
                Kill
              </button>
              <button
                onClick={() => {
                  handleSave(player._id);
                  socket.emit('refresh');
                }}
                disabled={!player.dead}
                className="px-3 py-1 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white"
              >
                Save
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>



     
    </div>
    </div>
    
  )
}

export default HostGameFiled