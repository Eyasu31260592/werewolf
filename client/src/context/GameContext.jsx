import { createContext , useContext , useState } from "react";

const GameContext = createContext();

export const GameProvider = ({children}) => {
    const [currentGameId, setCurrentGameId] = useState('');

    return <GameContext.Provider value={{
        currentGameId, setCurrentGameId
    }} >
        {children}
    </GameContext.Provider>
} 

export const useGame = () => useContext(GameContext);