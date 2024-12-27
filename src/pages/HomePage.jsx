import { Accordion, Flowbite } from "flowbite-react";
import DashboardNavbar from "../components/DashboardNavbar";
import CommandSidebar from "../components/CommandSidebar";
import GlobalLayout from "../layout/GlobalLayout";
import ProjectConfigDrawer from "../components/ProjectConfigDrawer";
import { useEffect, useState } from "react";
import DataPlayerTable from "../components/DataPlayerTable";
import PlayerRoom from "../components/PlayerRoom";
import LogicChart from "../components/LogicChart";

export default function HomePage() {
  const baseUrl = "http://localhost:3000/api/v1/players";

  let   [playersData, setPlayersData] = useState([])
  const [matchmakingDataIterative, setMatchmakingDataIterative] = useState({})
  const [matchmakingDataRecursive, setMatchmakingDataRecursive] = useState({})
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleDrawerClose = () => setIsDrawerOpen(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const resetFetchAllPlayer = () => {
    try {
      setPlayersData([]);
      setMatchmakingDataIterative({})
      setMatchmakingDataRecursive({})
      console.clear()
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchAllPlayers = async (count) => {
    try {
      const response = await fetch(
        `${baseUrl}/query=${count}`
      );

      if (!response.ok) {
        throw new Error('Network rerponse was not ok!')
      }

      const newData = await response.json()

      setPlayersData((prevData) => {
        const mergedData = [...prevData, ...newData];

        return mergedData.map((player, step) => ({
          ...player,
          Id: step + 1,
        }));
      });
    } catch (e) {
      console.log(e.message)
    }
  }

  const totalAverageMMREachTeam = (team, n = team.length) => { 
    try {
      if (n === 0) {
        return 0
      }

      const avg = team[n - 1].MMR + totalAverageMMREachTeam(team, n - 1)
      return avg / 2
    }catch (e) {
      console.log(e.message)
    }
  }

  const checkRoomIsValid = (team1, team2) => {
    try {
      const avgTeam1MMR = totalAverageMMREachTeam(team1); 
      const avgTeam2MMR = totalAverageMMREachTeam(team2); 

      const mmrGap = Math.abs(avgTeam1MMR - avgTeam2MMR); 

      if (mmrGap >= 200 && mmrGap <= 800) {
        return true;
      }

      return false;
    } catch (e) {
      console.error(`Error in checkRoomIsValid: ${e.message}`);
      return false;
    }
  };



  const createBalancedTeamRecursive = (playersData, n = playersData.length, Team1 = [], Team2 = []) => {
    try {
      if (n === 0) {
        return {
          Team1,
          Team2
        }
      } else {
        const playerPerTeams = 10
        const currentPlayer = playersData[n - 1]

        if (Team1.length < playerPerTeams / 2) {
          Team1.push(currentPlayer)
        } else if (Team2.length < playerPerTeams / 2) {
          Team2.push(currentPlayer)
        }

        return createBalancedTeamRecursive(playersData, n - 1, Team1, Team2);
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const createBalancedTeamIterative = () => { 
    try {
      const playersDataLength = playersData.length
      let Team1 = []
      let Team2 = []

      if (playersData.length > 0) {
        const playerPerTeams = Math.floor(10 / 2)
      
        // for (let i = 0; i < playersData.length; i++) {
        //   const currentPlayer = playersData[i]

        //   if (Team1.length < playerPerTeams) {
        //     Team1.push(currentPlayer)
        //   } else if (Team2.length < playerPerTeams / 2) {
        //     Team2.push(currentPlayer)
        //   }
        // }

        playersData.forEach((player, index) => {
          if (Team1.length < playerPerTeams) {
            Team1.push(player)
          }else if (Team2.length < playerPerTeams) {
            Team2.push(player)
          }
        })
      }

      return {
        Team1,
        Team2
      }
    }catch (e) {
      console.log(e.message)
    }
  }

  const assignRoomsRecursive = () => {
    const result = {};
    let roomIndex = 1;
    const playerPerRooms = 10;  
    let currentIndex = 0

    let currentRoom = {
      Team1: [],
      Team2: [],
      Status: true,
      TotalAVGMMRTeam1: 0,
      TotalAVGMMRTeam2: 0,
      TotalMMRAllTeam: 0,
      MMRGap: 0,
    };    

    while (currentIndex < playersData.length > 0) {
      const { Team1, Team2 } = createBalancedTeamRecursive(playersData.slice(currentIndex, currentIndex + playerPerRooms))

      const avgTeam1MMR = totalAverageMMREachTeam(Team1);
      const avgTeam2MMR = totalAverageMMREachTeam(Team2);
      const mmrGap = Math.abs(avgTeam1MMR - avgTeam2MMR);

      if (checkRoomIsValid(Team1, Team2)) {
        currentRoom.Team1 = Team1
        currentRoom.Team2 = Team2
        currentRoom.TotalAVGMMRTeam1 = avgTeam1MMR
        currentRoom.TotalAVGMMRTeam2 = avgTeam2MMR
        currentRoom.MMRGap = mmrGap
        currentRoom.Status = true
      }else {
        currentRoom.Team1 = Team1;
        currentRoom.Team2 = Team2;
        currentRoom.TotalAVGMMRTeam1 = avgTeam1MMR;
        currentRoom.TotalAVGMMRTeam2 = avgTeam2MMR;
        currentRoom.MMRGap = mmrGap;
        currentRoom.Status = false;
      }

      result[`rooms${roomIndex}`] = { ...currentRoom };
      roomIndex++;
      currentIndex += playerPerRooms

      currentRoom = {
        Team1: [],
        Team2: [],
        Status: true,
        TotalAVGMMRTeam1: 0,
        TotalAVGMMRTeam2: 0,
        TotalMMRAllTeam: 0,
        MMRGap: 0,
      };
    }
    setMatchmakingDataRecursive(result)
  }

  const assignRoomsIterative = () => {
    const result = {};
    let roomIndex = 1;
    const playerPerRooms = 10;
    let currentIndex = 0;

    let currentRoom = {
      Team1: [],
      Team2: [],
      Status: true,
      TotalAVGMMRTeam1: 0,
      TotalAVGMMRTeam2: 0,
      TotalMMRAllTeam: 0,
      MMRGap: 0,
    };

    while (currentIndex < playersData.length > 0) {
      const { Team1, Team2 } = createBalancedTeamIterative();

      const avgTeam1MMR = totalAverageMMREachTeam(Team1);
      const avgTeam2MMR = totalAverageMMREachTeam(Team2);
      const mmrGap = Math.abs(avgTeam1MMR - avgTeam2MMR);

      if (checkRoomIsValid(Team1, Team2)) {
        currentRoom.Team1 = Team1;
        currentRoom.Team2 = Team2;
        currentRoom.TotalAVGMMRTeam1 = avgTeam1MMR;
        currentRoom.TotalAVGMMRTeam2 = avgTeam2MMR;
        currentRoom.MMRGap = mmrGap;
        currentRoom.Status = true;
      } else {
        currentRoom.Team1 = Team1;
        currentRoom.Team2 = Team2;
        currentRoom.TotalAVGMMRTeam1 = avgTeam1MMR;
        currentRoom.TotalAVGMMRTeam2 = avgTeam2MMR;
        currentRoom.MMRGap = mmrGap;
        currentRoom.Status = false;
      }

      if (currentRoom.Team1.length === playerPerRooms / 2 && currentRoom.Team2.length === playerPerRooms / 2) {
        result[`rooms${roomIndex}`] = { ...currentRoom };
        roomIndex++;
        currentIndex += playerPerRooms;

        currentRoom = {
          Team1: [],
          Team2: [],
          Status: true,
          TotalAVGMMRTeam1: 0,
          TotalAVGMMRTeam2: 0,
          TotalMMRAllTeam: 0,
          MMRGap: 0,
        };
      }
    }
    setMatchmakingDataIterative(result);
  };

  console.log("Rooms Recursive", matchmakingDataRecursive)
  console.log("Rooms Iterative", matchmakingDataIterative)

  useEffect(() => {
    fetchAllPlayers();
  }, [])

  return (
    <Flowbite>
      <DashboardNavbar />
      <div className="flex h-[calc(100vh-86px)]">
        <CommandSidebar
          handleFetchAllPlayers={fetchAllPlayers}
          handleResetFetchAllPlayers={resetFetchAllPlayer}
          handleRunProgramMatchmakingIterative={assignRoomsIterative}
          handleRunProgramMatchmakingRecursive={assignRoomsRecursive}
          playersData={playersData}
        />
        <GlobalLayout>
          <div className="border-2 border-gray-100 bg-white rounded-2xl w-2/5 max-h-full overflow-y-auto">
            <div className="top-0 sticky flex justify-between gap-x-4 bg-gray-50 mb-4 px-4 py-2">
              <p className="font-semibold text-lg">Player Data</p>
            </div>

            <div className="px-4 py-1">
              <DataPlayerTable playerData={playersData} />
            </div>
          </div>

          <div className="flex-col space-y-4 w-3/5 max-h-full overflow-y-scroll">
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title>Graf</Accordion.Title>
                <Accordion.Content>
                  {/* <LogicChart runningTimeIterative={timeLogIterative} runningTimeRecursive={timeLogRecursive}/> */}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <div className="inline-flex top-0 sticky gap-x-2.5 border-2 border-gray-100 bg-gray-50 p-4 rounded-xl w-full">
              <span className="inline-flex justify-center items-center gap-x-1 text-gray-600 text-sm">
                Balance Team
                <div className="bg-teal-600 mt-1 rounded-full w-2 h-2"></div>
              </span>

              <span className="inline-flex justify-center items-center gap-x-1 text-gray-600 text-sm">
                Not Balance Team
                <div className="bg-red-600 mt-1 rounded-full w-2 h-2"></div>
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto">
              <div className="border-2 border-gray-100 rounded-2xl w-full w-fmax-h-full overflow-y-auto">
                <div className="flex justify-between gap-x-4 bg-gray-50 mb-4 px-4 py-2">
                  <p className="font-semibold text-lg">Matchmaking Iterative</p>
                  <p className="text-gray-600 text-sm">Running Time: </p>
                </div>
                <div className="gap-4 grid grid-cols-2 px-4 py-1">
                  {/* <PlayerRoom matchmakingData={matchmakingDataIterative} /> */}
                </div>
              </div>

              <div className="border-2 border-gray-100 rounded-2xl w-full max-h-full overflow-y-auto">
                <div className="flex justify-between gap-x-4 bg-gray-50 mb-4 px-4 py-2">
                  <p className="font-semibold text-lg">Matchmaking Recursive</p>
                  <p className="text-gray-600 text-sm">Running Time: </p>
                </div>
                <div className="gap-4 grid grid-cols-2 px-4 py-1">
                  {/* <PlayerRoom matchmakingData={matchmakingDataRecursive} /> */}
                </div>
              </div>
            </div>
          </div>
        </GlobalLayout>
      </div>
      <ProjectConfigDrawer
        drawerIsOpen={isDrawerOpen}
        close={handleDrawerClose}
      />
    </Flowbite>
  );
}