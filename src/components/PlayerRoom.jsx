import { useEffect, useState } from "react";
import { createBalancedTeamIterative, randomizePlayer } from "../../server/controller/PlayerController";

export default function PlayerRoom({ isAvailable }) {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        const items = randomizePlayer()

        if (items) {
            setPlayers(items)
        }
    }, [])

    const team = createBalancedTeamIterative(players)
    console.log(team)

    return (
      <>
        {/* {team && team != null ? (
          <>
            {team.team1.map((items, idx) => (
              <div key={idx}>
                <h4 className="font-medium text-xl">{`Room ${idx + 1}`}</h4>
                {team.team2.map((items2, idx) => (
                  <div key={idx}>
                    <div>
                      <h5 className="mb-2 text-lg">{`Team ${idx + 1}`}</h5>

                      <ul>
                        <li className="flex justify-between">
                          <div className="inline-flex justify-center items-center gap-x-0.5">
                            <p className="font-semibold text-base">{items.Name}</p>
                            <p className="text-sm">{"(Midlaner)"}</p>
                          </div>
                          <p className="font-semibold">5000</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          <p>s</p>
        )} */}

        {team && team != null ? (
          <div className="space-y-3 border-2 border-gray-100 p-4 rounded-md">
            <h4 className="font-medium text-xl">Room Matchmaking</h4>

            <div>
              <h5 className="mb-2 font-semibold text-lg">Team 1</h5>

              {team.team1.map((team1, idx) => (
                <ul key={idx}>
                  <li className="flex justify-between mb-2">
                    <div className="inline-flex justify-center items-center gap-x-0.5">
                      <p className="font-semibold text-base">{team1.Name}</p>
                      <p className="text-sm">{`(${team1.Role})`}</p>
                    </div>
                    <p className="font-semibold">{team1.MMR}</p>
                  </li>
                </ul>
              ))}
            </div>

            <div>
              <h5 className="mb-2 font-semibold text-lg">Team 1</h5>

              {team.team2.map((team2, idx) => (
                <ul key={idx}>
                  <li className="flex justify-between mb-2">
                    <div className="inline-flex justify-center items-center gap-x-0.5">
                      <p className="font-semibold text-base">{team2.Name}</p>
                      <p className="text-sm">{`(${team2.Role})`}</p>
                    </div>
                    <p className="font-semibold">{team2.MMR}</p>
                  </li>
                </ul>
              ))}
            </div>

            <hr className="bg-gray-200 h-0.5" />

            <div className="space-y-1.5">
              <p className="flex justify-between items-center font-semibold text-xs">
                Average MMR Team 1:
                <span className="font-normal">{parseInt(team.team1MMR)}</span>
              </p>

              <p className="flex justify-between items-center font-semibold text-xs">
                Average MMR Team 2:
                <span className="font-normal">{parseInt(team.team2MMR)}</span>
              </p>

              <p className="flex justify-between items-center font-semibold text-xs">
                Total Average MMR:
                <span className="font-normal">
                  {parseInt(team.team1MMR + team.team2MMR)}
                </span>
              </p>
            </div>

            <hr className="bg-gray-200 h-0.5" />

            <div className="space-y-1.5">
              <p className="flex justify-between items-center font-semibold text-xs">
                MMR Gap:
                <span className="font-normal">{parseInt(team.team1MMR)}</span>
              </p>
            </div>
          </div>
        ) : (
          <p>s</p>
        )}
      </>
    );
}