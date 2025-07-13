import { useUser } from "@clerk/clerk-react";
import HostStartButton from "../components/HostStartButton";
import PlayerLobby from "../components/PlayerLobby";

export default function Lobby() {
  const {user, isSignedIn} = useUser();

  if(!isSignedIn) return null;

  const role = user.publicMetadata.role;

  return (
    <div className="bg-gray-800  pb-5">
      {role === 'host' ? <HostStartButton/> : <PlayerLobby/>}
    </div>
  );
}
