/* CONFIG */
const ranks = ["Grand Master", "Epic", "Legend", "Mythic"];
const roles = ["Explaner", "Midlaner", "Goldlaner", "Roamer"];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const playersCount = 10;

const minMMRPoint = 500;
const maxMMRPoint = 1000;

const rankMultiplier = {
    "Grand Master": 2,
    "Epic": 4,
    "Legend": 6,
    "Mythic": 8
};

function randomizePlayer(playersCount) {
    const data = [];
    for (let i = 0; i < playersCount; i++) {
        const rank = ranks[randomInt(0, ranks.length - 1)];
        const mmr = randomInt(minMMRPoint, maxMMRPoint) * rankMultiplier[rank];
        const role = roles[randomInt(0, roles.length - 1)];

        data.push({
            Id: i + 1,
            Name: `PLAYER - ${i + 1}`,
            Rank: rank,
            MMR: mmr,
            Role: role
        });
    }
    return data;
}

function groupByRankIterative(players) {
    const playersByRank = {
        "Grand Master": [],
        "Epic": [],
        "Legend": [],
        "Mythic": [],
    };

    for (const player of players) {
        playersByRank[player.Rank].push(player);
    }

    return playersByRank;
}

function groupByMMRIterative(players) {
    const playersByMMR = {
        "Amateur": [],
        "Intermediate": [],
        "Professional": [],
    };

    for (const player of players) {
        if (player.MMR === minMMRPoint) {
            playersByMMR.Amateur.push(player);
        } else if (player.MMR > minMMRPoint && player.MMR <= maxMMRPoint) {
            playersByMMR.Intermediate.push(player);
        } else if (player.MMR > maxMMRPoint) {
            playersByMMR.Professional.push(player);
        }
    }

    return playersByMMR;
}

function totalMMREachTeam(team) {
  let totalMMR = 0;

  for (let i = 0; i < team.length; i++) {
    totalMMR += team[i].MMR;
  }

  return totalMMR;
};

function createBalancedTeamIterative(players) {
  if (players.length > 0) {
    let team1 = [];
    let team2 = [];

    let team1Count = 0;
    let team2Count = 0;

    for (let i = 0; i < players.length; i++) {
      if (team1Count < 5) {
        team1[team1Count++] = players[i];
      } else if (team2Count < 5) {  
        team2[team2Count++] = players[i];
      }
    }

    // Calculate MMR for each team
    const team1MMR = totalMMREachTeam(team1) / team1.length;
    const team2MMR = totalMMREachTeam(team2) / team2.length;

    let validated;

    // Compare MMRs and print balance status
    const mmrDifference = Math.abs(team1MMR - team2MMR);
    if (mmrDifference < 100) {
      validated = false
      console.log("Unbalanced, one of the teams has too weak MMR");
    } else if (mmrDifference > 200) {
      validated = false;
      console.log("Unbalanced, one of the teams has too strong MMR");
    } else {
      validated = true;
      console.log("Balanced");
    }

    return { team1, team2, team1MMR, team2MMR, mmrDifference, validated };
  }
  return null;
}

function createBalancedTeamRecursive(players) {
    if (players.length === 0)
    {
        return null;
    }

    const limitedPlayers = players.slice(0, 10); // Limit players to 10 for matchmaking lobby
    const team1 = [];
    const team2 = [];

    assignTeams(limitedPlayers, team1, team2, 0);

    // Calculate MMR for each team
    const team1MMR = totalMMREachTeam(team1) / team1.length;
    const team2MMR = totalMMREachTeam(team2) / team2.length;

    let validated;

    // Compare MMRs and print balance status
    const mmrDifference = Math.abs(team1MMR - team2MMR);
    if (mmrDifference < 100) {
      validated = false
      console.log("Unbalanced, one of the teams has too weak MMR");
    } else if (mmrDifference > 200) {
      validated = false;
      console.log("Unbalanced, one of the teams has too strong MMR");
    } else {
      validated = true;
      console.log("Balanced");
    }

    return { team1, team2, team1MMR, team2MMR, mmrDifference, validated };
}

function assignTeams(limitedPlayers, team1, team2, index) 
{
    if (index >= limitedPlayers.length) 
    {
        return;
    }

    if (team1.length < 5) 
    {
        team1[team1.length] = limitedPlayers[index];
    } 
    else if (team2.length < 5) 
    {
        team2[team2.length] = limitedPlayers[index];
    }
    assignTeams(limitedPlayers, team1, team2, index + 1);
};
/*
const createBalancedTeamIterative = async (req, res) => 
{
  try {
    const { playersCount } = req.params;
    const playerDatas = randomizePlayers(playersCount)
    const playerPerRooms = 10

    const result = 
    {
      Id: 1,
    }

    let roomIndex = 1
    let currentRoom = 
    {
      Team1 : [],
      Team2 : [],
      Team1Count : 0,
      Team2Count : 0,
      Status : true,
      TotalMMRTeam1 : 0,
      TotalMMRTeam2 : 0,
      TotalMMRAllTeam : 0,
      MMRGap: 0,
    }
    
    if (playerDatas.length > 0)
    {
      playerDatas.forEach((player, index) => 
      {
        if (currentRoom.Team1.length  < playerPerRooms / 2) 
        {
          currentRoom.Team1[currentRoom.Team1Count++] = player[index];
        }
        else if (currentRoom.Team2.length  < playerPerRooms / 2) 
        {
          currentRoom.Team2[currentRoom.Team2Count++] = player[index];
        }

        const avgTeam1MMR = totalMMREachTeam(currentRoom.Team1) / currentRoom.Team1.length;
        const avgTeam2MMR = totalMMREachTeam(currentRoom.Team2) / currentRoom.Team2.length;

        const mmrGap = Math.abs(avgTeam1MMR - avgTeam2MMR)

        currentRoom.TotalMMRTeam1 = avgTeam1MMR
        currentRoom.TotalMMRTeam2 = avgTeam2MMR
        currentRoom.TotalMMRAllTeam = (avgTeam1MMR + avgTeam2MMR)
        currentRoom.MMRGap = mmrGap
        currentRoom.Status = mmrGap >= 200 && mmrGap <= 500

        if (currentRoom.Team1.length === playerPerRooms / 2 && currentRoom.Team2.length === playerPerRooms / 2) 
        {
          result[rooms${roomIndex}] = currentRoom
          roomIndex++
          currentRoom = 
          {
            Team1: [],
            Team2: [],
            Status : true,
            TotalMMRTeam1 : 0,
            TotalMMRTeam2 : 0,
            TotalMMRAllTeam : 0,
            MMRGap: 0,
          }
        }
      })

      if (currentRoom.Team1.length > 0 || currentRoom.Team2.length > 0) 
      {
        result[`rooms${roomIndex}`] = currentRoom;
      }
    }
    await res.status(200).json(result)
  }
  catch (e) 
  {
      console.log(e.message)
      res.status(500).send('Tidak bisa mengambil data player')
  }
}
*/
/*
const createBalancedTeamRecursive = async (req, res) => 
{
  try {
    const { playersCount } = req.params;
    const playerPerRooms = 10;

    const result = { Id: 1 };
    let roomIndex = 1;

    for (let playerDatas = randomizePlayer(playersCount); playerDatas.length > 0; playerDatas = playerDatas.slice(playerPerRooms)) 
    {
      const currentRoom = createRoom(playerDatas, playerPerRooms);
      result[`rooms${roomIndex}`] = currentRoom;
      roomIndex++;
    }

    await res.status(200).json(result);
  } 
  catch (e) 
  {
    console.log(e.message);
    res.status(500).send('Unable to retrieve player data');
  }
};

function createRoom(players, playerPerRooms) 
{
  const team1 = [];
  const team2 = [];
  return createTeams(players, team1, team2, playerPerRooms);
};

function createTeams(players, team1, team2, playerPerRooms) 
{
  if (players.length === 0) 
  {
    return {
      Team1: team1,
      Team2: team2,
      Status: true,
      TotalMMRTeam1: totalMMREachTeam(team1) / (team1.length || 1),
      TotalMMRTeam2: totalMMREachTeam(team2) / (team2.length || 1),
      TotalMMRAllTeam: (totalMMREachTeam(team1) + totalMMREachTeam(team2)),
      MMRGap: Math.abs((totalMMREachTeam(team1) / (team1.length || 1)) - (totalMMREachTeam(team2) / (team2.length || 1))),
    };
  }

  const player = players[0];
  players = players.slice(1);

  if (team1.length < playerPerRooms / 2) 
  {
    team1[team1.length] = player[playerPerRooms];
  } 
  else if (team2.length < playerPerRooms / 2) 
  {
    team2[team2.length] = player[playerPerRooms];
  }
  
  return createTeams(players, team1, team2, playerPerRooms);
};
*/