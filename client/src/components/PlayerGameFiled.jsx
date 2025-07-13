import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import VillagerCard from "./VillagerCard";
import DoctorCard from "./DoctorCard";
import WerewolfCard from "./WerewolfCard";
import SerialKillerCard from "./SerialKillerCard";
import DetectiveCard from "./DetectiveCard";
import JapaneseMafia from "./JapaneseMafia";
import ItalianMafiaCard from "./ItalianMafiaCard";
import { socket } from "./../utils/socket";
import { useNavigate } from 'react-router-dom';
import ImmortalCard from "./ImmortalCard";

const PlayerGameFiled = () => {
  const { user, isLoaded } = useUser();
  const [info, setInfo] = useState({});
  const [showCard, setShowCard] = useState(false);
  const [playerToKill, setplayerToKill] = useState([]);
  const id = user?.id;
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const renderRoleCard = () => {
    switch (info.role) {
      case "villager":
        return <VillagerCard />;
      case "doctor":
        return <DoctorCard />;
      case "werewolf":
        return <WerewolfCard info={info} />;
      case "serialKiller":
        return <SerialKillerCard info={info} />;
      case "japaneseMafia":
        return <JapaneseMafia info={info} />;
      case "italianMafia":
        return <ItalianMafiaCard info={info} />;
      case "detective":
        return <DetectiveCard />;
      case "immortal":
        return <ImmortalCard />; 

      default:
        return <p className="text-center text-red-500">Unknown role</p>;
    }
  };

  const getplayerToKill = async (...ids) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/get-player-to-kill/${ids.join(",")}`
      );
      console.log(data);
      setplayerToKill(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePlayerSelection = (player) => {
    socket.emit("japaneseMafia_want_to_kill", player);
  };
  const handlePlayerSelectionForDoctor = (player) => {
    socket.emit("doctor_want_to_save", player);
  };
  const handlePlayerSelectionForGuess = (player) => {
    socket.emit("detective_guess", player);
  };

  useEffect(() => {
    const getSelfInfo = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/self-info/${id}`
        );
        setInfo(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSelfInfo();
  }, [user]);

  useEffect(() => {
    if (info?.role === "japaneseMafia") {
      socket.on("JapaneseMafia", () => {
        if (!info.dead) {
          const id1 = info._id;
          const id2 = info.mateInfo?.id;
          getplayerToKill(id1, id2);
          setShowCard(true);
        }
      });
      return () => socket.off("Japanese-Mafia");
    }

    if (info?.role === "werewolf") {
      socket.on("werewolf", () => {
        if (!info.dead) {
          const id1 = info._id;
          const id2 = info.mateInfo?.id;
          getplayerToKill(id1, id2);
          setShowCard(true);
        }
      });
      return () => socket.off("werewolf");
    }

    if (info?.role === "serialKiller") {
      socket.on("serialKiller", () => {
        if (!info.dead) {
          const id1 = info._id;
          const id2 = info.mateInfo?.id;
          getplayerToKill(id1, id2);
          setShowCard(true);
        }
      });
      return () => socket.off("serialKiller");
    }

    if (info?.role === "italianMafia") {
      socket.on("italianMafia", () => {
        if (!info.dead) {
          const id1 = info._id;
          const id2 = info.mateInfo?.id;
          getplayerToKill(id1, id2);
          setShowCard(true);
        }
      });
      return () => socket.off("italianMafia");
    }

    if (info?.role === "doctor") {
      socket.on("doctor", () => {
        if (!info.dead && !info.self) {
            let id1 = "100";
          if(info.self){
            id1 = info._id;
          }
          getplayerToKill(id1);
          setShowCard(true);
        }
      });
      return () => socket.off("doctor");
    }

    if (info?.role === "detective") {
      socket.on("detective", () => {
        if (!info.dead) {
          const id1 = info._id;
          getplayerToKill(id1);
          setShowCard(true);
        }
      });
      return () => socket.off("detective");
    }

    socket.on('refresh',()=> {
      window.location.reload()    
    })
  }, [info?.role, socket]);
  return (
    <div className="bg-gray-800 flex justify-center p-6">
      {!info.dead ? renderRoleCard() 
      : 

        <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black text-white shadow-xl border border-red-700 flex flex-col items-center justify-center space-y-4">
    <div className="text-5xl">🪦</div>
    <h3 className="text-2xl font-bold tracking-wide">Rest In Peace</h3>
    <p className="text-lg italic text-red-300">{info.name}</p>
    <p className="text-sm text-gray-400">Role: {info.role}</p>

    <div className="w-full h-1 bg-red-700 rounded-full opacity-50" />

    <p className="text-sm text-center text-gray-500">
      May their spirit guide the living... 👻
    </p>
  </div>
      }

      {showCard && playerToKill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full mx-auto transform transition-all duration-300 scale-100 opacity-100">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-200">
              Select a Player
            </h3>
            <div className="space-y-4 h-52 overflow-y-scroll">
              {playerToKill.length > 0 ? (
                playerToKill.map((player) => (
                  <button
                    key={player._id}
                    className="w-full bg-yellow-800 hover:bg-yellow-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                    onClick={() => {
                      if (info?.role === "doctor") {
                        handlePlayerSelectionForDoctor(player);
                      } else if(info?.role === "detective"){
                       handlePlayerSelectionForGuess(player);
                      }else{
                         handlePlayerSelection(player);
                      }
                      setShowCard(false)
                    }  
                    
                  }
                  >
                    {player.name}
                  </button>
                ))
              ) : (
                <p className="text-center text-gray-600">
                  No players available to eliminate.
                </p>
              )}
            </div>
            {/* Optional: Add a close button or action */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowCard(false)} // Assuming you have a state setter for showCard
                className="text-gray-200 hover:text-gray-100 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerGameFiled;
