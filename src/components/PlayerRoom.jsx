import React, { useState, useEffect } from "react";

export default function PlayerRoom({ matchmakingData }) {
  const [roomsToDisplay, setRoomsToDisplay] = useState([]); 
  const roomKeys = Object.keys(matchmakingData);

  useEffect(() => {
    const delayRoomDisplay = async () => {
      setRoomsToDisplay([]);

      for (let i = 0; i < roomKeys.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 0));
        setRoomsToDisplay((prev) => [...prev, roomKeys[i]]);
      }
    };

    if (roomKeys?.length > 0) {
      delayRoomDisplay();
    }
  }, [matchmakingData]);

  return (
    <div>
      {roomsToDisplay.map((roomKey) => {
        const room = matchmakingData[roomKey];

        if (!room) {
            return null
        }

        return (
          <div key={roomKey}>
            <h2>{roomKey}</h2>
            {Object.keys(room).map((teamKey) => {
                if (
                  [
                    "Status",
                    "TotalMMRTeam1",
                    "TotalMMRTeam2",
                    "TotalMMRAllTeam",
                    "MMRGap",
                  ].includes(teamKey)
                ) {
                  return null;
                }
              const team = room[teamKey];
              return (
                <div key={teamKey}>
                  <h3>{teamKey}</h3>
                  <ul>
                    {Array.isArray(team) &&
                      team?.map((player) => (
                        <li key={player.Id}>
                          {player.Name} - {player.Rank} - {player.MMR} -{" "}
                          {player.Role}
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}

            <div>{room.MMRGap}</div>
          </div>
        );
      })}
    </div>
  );
}
