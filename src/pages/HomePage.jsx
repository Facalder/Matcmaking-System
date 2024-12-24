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
    const baseUrl = "http://localhost:3000/api/v1/player";

    const [playersData, setPlayersData] = useState([])
    const [log, setLogs] = useState([])
    const [timeLog, setTimeLogs] = useState([])
    const [matchmakingData, setMatchmakingData] = useState({})
    const [matchmakingDataRecursive, setMatchmakingDataRecursive] = useState({})
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleDrawerClose = () => setIsDrawerOpen(false);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const resetFetchAllPlayer = () => {
      try {
        setPlayersData([]);
        setTimeLogs([]);
        setMatchmakingData({})
        setMatchmakingDataRecursive({})
        console.clear()
      } catch (e) {
        console.log(e.message);
      }
    };
    
    const fetchAllPlayers = async (count) => { 
        const startTime = performance.now()

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

            const endTime = performance.now()
            const elapsedTime = startTime - endTime
        }catch (e) {
            console.log(e.message)
        }
    }


    const totalMMREachTeam = (team) => {
      let totalMMR = 0;

      for (let i = 0; i < team.length; i++) {
        totalMMR += team[i].MMR;
      }

      return totalMMR;
    };

    const createBalancedTeamIterative = () => {
      try {
        const result = {}; 
        let roomIndex = 1;
        let currentRoom = {
          Team1: [],
          Team2: [],
          Status: true,
          TotalMMRTeam1: 0,
          TotalMMRTeam2: 0,
          TotalMMRAllTeam: 0,
          MMRGap: 0,
        };
        const playerPerRooms = 10;

        if (playersData.length > 0) {
          const startTime = performance.now()

          playersData.forEach(async (player, index) => {
            if (currentRoom.Team1.length < playerPerRooms / 2) {
              currentRoom.Team1.push(player);
            } else if (currentRoom.Team2.length < playerPerRooms / 2) {
              currentRoom.Team2.push(player);
            }

            const avgTeam1MMR =
              totalMMREachTeam(currentRoom.Team1) / currentRoom.Team1.length;
            const avgTeam2MMR =
              totalMMREachTeam(currentRoom.Team2) / currentRoom.Team2.length;

            const mmrGap = Math.abs(avgTeam1MMR - avgTeam2MMR);

            currentRoom.TotalMMRTeam1 = avgTeam1MMR;
            currentRoom.TotalMMRTeam2 = avgTeam2MMR;
            currentRoom.TotalMMRAllTeam = avgTeam1MMR + avgTeam2MMR;
            currentRoom.MMRGap = mmrGap;
            currentRoom.Status = mmrGap >= 200 && mmrGap <= 500;

            if (
              currentRoom.Team1.length === playerPerRooms / 2 &&
              currentRoom.Team2.length === playerPerRooms / 2
            ) {
              result[`rooms${roomIndex}`] = {...currentRoom};
              roomIndex++;
              currentRoom = {
                Team1: [],
                Team2: [],
                Status: true,
                TotalMMRTeam1: 0,
                TotalMMRTeam2: 0,
                TotalMMRAllTeam: 0,
                MMRGap: 0,
              };
            }
          });

          if (currentRoom.Team1.length > 0 || currentRoom.Team2.length > 0) {
            result[`rooms${roomIndex}`] = currentRoom;
          }
        }
        alert("Berhasil membuat room!")
        setMatchmakingData(result)
      } catch (e) {
        console.error("Error in createBalancedTeam:", e);
        return null;
      }
    };

    const createBalancedTeamRecursive = (players) => {
      if (players.length === 0) {
        setMatchmakingDataRecursive({}); // Reset state jika tidak ada pemain
        return;
      }

      let result = {};
      assignRooms(players, result, 1, 0); // Mulai dari room 1 dan indeks 0

      // Simpan hasil ke state
      setMatchmakingDataRecursive(result);
    };

    const assignRooms = (players, result, roomIndex, startIndex) => {
      if (startIndex >= players.length) {
        return; // Jika semua pemain sudah diproses, selesai
      }

      let team1 = [];
      let team2 = [];
      let playerCount = 0;

      // Tambahkan pemain ke room saat ini
      while (playerCount < 10 && startIndex + playerCount < players.length) {
        if (team1.length < 5) {
          team1.push(players[startIndex + playerCount]);
        } else {
          team2.push(players[startIndex + playerCount]);
        }
        playerCount++;
      }

      // Hitung MMR untuk room saat ini
      const avgTeam1MMR = totalMMREachTeam(team1) / team1.length;
      const avgTeam2MMR = totalMMREachTeam(team2) / team2.length;
      const mmrGap = Math.abs(avgTeam1MMR - avgTeam2MMR);

      // Simpan room ke hasil
      result[`rooms${roomIndex}`] = {
        Team1: team1,
        Team2: team2,
        TotalMMRTeam1: avgTeam1MMR,
        TotalMMRTeam2: avgTeam2MMR,
        MMRGap: mmrGap,
      };

      // Rekursi untuk pemain yang tersisa
      assignRooms(players, result, roomIndex + 1, startIndex + playerCount);
    };

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
            handleRunProgramMatchmakingIterative={createBalancedTeamIterative}
            handleRunProgramMatchmakingRecursive={createBalancedTeamRecursive}
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
                        <LogicChart/>
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
                    <p className="font-semibold text-lg">
                      Matchmaking Iterative
                    </p>
                    <p className="text-gray-600 text-sm">Running Time: </p>
                  </div>
                  <div className="gap-4 grid grid-cols-2 px-4 py-1">
                    <PlayerRoom matchmakingData={matchmakingData} />
                  </div>
                </div>

                <div className="border-2 border-gray-100 rounded-2xl w-full max-h-full overflow-y-auto">
                  <div className="flex justify-between gap-x-4 bg-gray-50 mb-4 px-4 py-2">
                    <p className="font-semibold text-lg">
                      Matchmaking Recursive
                    </p>
                    <p className="text-gray-600 text-sm">Running Time: </p>
                  </div>
                  <div className="gap-4 grid grid-cols-2 px-4 py-1">
                    <PlayerRoom matchmakingData={matchmakingDataRecursive} />
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