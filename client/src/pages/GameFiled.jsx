import { useUser } from "@clerk/clerk-react";
import React from "react";
import HostGameFiled from "../components/HostGameFiled";
import PlayerGameFiled from "../components/PlayerGameFiled";

const GameFiled = () => {
  const { user ,isLoaded} = useUser();
  

  if (!isLoaded) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  const role = user.publicMetadata.role;

  return <div>{role == "host" ? <HostGameFiled /> : <PlayerGameFiled />}</div>;
};

export default GameFiled;
