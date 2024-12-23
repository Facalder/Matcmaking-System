import { ranks, roles, rankMultiplier } from "../model/PlayerModel";
import { minMMRPoint, maxMMRPoint } from "../model/MatchConfig";

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomizePlayer = (playersCount = 40) => {
  let data = [];

  for (let i = 0; i < parseInt(playersCount); i++) {
    const rank = ranks[randomInt(0, ranks.length - 1)];
    let mmr = randomInt(minMMRPoint, maxMMRPoint) * rankMultiplier[rank];
    const role = roles[randomInt(0, roles.length - 1)];

    data.push({
      Id: i + 1,
      Name: `PLAYER - ${100 + i + 1}`,
      Rank: rank,
      MMR: mmr > 5000 ? (mmr = 5000) : mmr,
      Role: role,
    });
  }

  return data;
};

function groupByRankIterative(players) {
  const playersByRank = {
    "Grand Master": [],
    Epic: [],
    Legend: [],
    Mythic: [],
  };

  for (const player of players) {
    playersByRank[player.Rank].push(player);
  }

  return playersByRank;
}

function groupByMMRIterative(players) {
  const playersByMMR = {
    Amateur: [],
    Intermediate: [],
    Professional: [],
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

const totalMMREachTeam = (team) => {
  let totalMMR = 0;

  for (let i = 0; i < team.length; i++) {
    totalMMR += team[i].MMR;
  }

  return totalMMR;
};

const createBalancedTeamIterative = (players) => {
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

const createBalancedTeamRecursive = (players) => {
  if (players.length === 0) {
    return null;
  }

  const limitedPlayers = players.slice(0, 10); // Limit players to 10 for matchmaking lobby
  let team1 = [];
  let team2 = [];

  assignPlayers(limitedPlayers, team1, team2, 0);
  return { team1, team2 };
}

function assignPlayers(limitedPlayers, team1, team2, index) {
  if (index >= limitedPlayers.length) {
    return;
  }

  if (team1.length < 5) {
    team1[team1.length] = limitedPlayers[index]; // Using array length to add element
  } else if (team2.length < 5) {
    team2[team2.length] = limitedPlayers[index]; // Using array length to add element
  }

  assignPlayers(limitedPlayers, team1, team2, index + 1);
}

export {
  randomizePlayer,
  createBalancedTeamIterative,
  createBalancedTeamRecursive,
};