import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import { socket } from "../utils/socket";
import { useNavigate } from "react-router-dom";

const AssignRole = () => {
  const { success , warn, error} = useToast();
  const navigate = useNavigate();
  const [playerList, setPlayerList] = useState([]);
  const [updatedPlayerList, setUpdatedPlayerList] = useState([]);
  const [avalablePlayerList, setavalablePlayerList] = useState(0);
  const [totalKiller, setTotalKiller] = useState(0);
  const [showButon, setShowButon] = useState(false);
  const { user } = useUser();
  const id = user?.id;
  const [roles, setRoles] = useState({
    werewolf: 0,
    serialKiller: 0,
    japaneseMafia: 0,
    italianMafia: 0,
  });

  const handleChange = (role, value) => {
    const parsed = parseInt(value) || 0;
    setRoles((prev) => ({ ...prev, [role]: parsed }));
  };

  const assignRoleToPlayers = async (e) => {
    e.preventDefault();
    const shuffled = [...playerList].sort(() => Math.random() - 0.5);

    let index = 0;

    shuffled[index].role = "doctor";
    updatedPlayerList.push(shuffled[index]);
    index++;

    shuffled[index].role = "detective";
    updatedPlayerList.push(shuffled[index]);
    index++;

    shuffled[index].role = "immortal";
    updatedPlayerList.push(shuffled[index]);
    index++;

    const killerRoles = [
      "werewolf",
      "serialKiller",
      "japaneseMafia",
      "italianMafia",
    ];

    for (const role of killerRoles) {
      const count = roles[role];

      if (count === 0) continue;

      if (count === 2) {
        const player1 = shuffled[index];
        const player2 = shuffled[index + 1];

        player1.role = role;
        player2.role = role;

        player1.mate = true;
        player2.mate = true;

        player1.mateInfo = { name: player2.name, id: player2._id };
        player2.mateInfo = { name: player1.name, id: player1._id };

        updatedPlayerList.push(player1, player2);
        index += 2;
      } else if (count === 1) {
        const player = shuffled[index];
        player.role = role;
        updatedPlayerList.push(player);
        index++;
      }
    }

     while (index < shuffled.length) {
    shuffled[index].role = 'villager';
    updatedPlayerList.push(shuffled[index]);
    index++;
  }

    // console.log(updatedPlayerList);
   

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/assign-role`,{
        updatedPlayerInfo: updatedPlayerList
      })
      socket.emit('game_Started');
      navigate('/game-filed');
    } catch (err) {
      error(err.message)
    }
  };

   const updateButtonVisibility = (killerSum, availableCount) => {
  if (killerSum === 0) {
    setShowButon(false);
  } else if (killerSum >= availableCount) {
    setShowButon(false);
  } else {
    setShowButon(true);
  }
};

  useEffect(() => {
    let sum =
      roles.werewolf +
      roles.serialKiller +
      roles.japaneseMafia +
      roles.italianMafia;
    setTotalKiller(sum);
   updateButtonVisibility(sum, avalablePlayerList);
  }, [roles,avalablePlayerList]);

  useEffect(() => {
    const getNumOfUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/player-list-for-player/${id}`
        );

        setPlayerList(data);
        setavalablePlayerList(data.length - 3);
        setavalablePlayerList(available);
      updateButtonVisibility(totalKiller, available);
      } catch (error) {
        console.log(error.message);
      }
    };
    getNumOfUser();
  }, []);

  return (
    <div className="absolute top-28 left-1/2 -translate-x-1/2 bg-yellow-500 text-black p-8 rounded-2xl shadow-lg w-full max-w-xl">
      <h2 className="text-3xl font-bold text-center mb-6">🎭 Assign Roles</h2>
      <p className="text-center mb-5 text-md font-bold">
        {" "}
        📌there are one doctor, one detective and one villager by Default
      </p>
      <form
        onSubmit={assignRoleToPlayers}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {[
          { label: "🐺 Werewolf", key: "werewolf" },
          { label: "🔪 Serial Killer", key: "serialKiller" },
          { label: "🇯🇵 Japanese Mafia", key: "japaneseMafia" },
          { label: "🇮🇹 Italian Mafia", key: "italianMafia" },
        ].map(({ label, key }) => (
          <div key={key} className="flex flex-col">
            <label className="mb-1 text-lg font-medium">{label}</label>
            <input
              type="number"
              min={0}
              max={2}
              value={roles[key]}
              onChange={(e) => {
                handleChange(key, e.target.value);
              }}
              className="px-3 py-2 rounded bg-white text-black outline-none border border-gray-300 focus:ring-2 focus:ring-yellow-600"
            />
          </div>
        ))}

        <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
          {showButon ? (
            <button
              type="submit"
              className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition duration-300"
            >
              ✅ Assign Roles And Start The Game
            </button>
          ) : (
            <p className="text-red-700 ">
              ❗ cross check the number of palyer and role ❗
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AssignRole;
