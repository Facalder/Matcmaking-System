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

function createBalancedTeamIterative(players) {
    if (players.length > 0) {
        const limitedPlayers = players.slice(0, 10); //Membatasi data pemain hingga 10 saat matchmaking lobby
        
        let team1 = new Array(limitedPlayers);
        let team2 = new Array(limitedPlayers);

        let team1Count = 0;
        let team2Count = 0;

        for (let i = 0; i < players.length; i++) {
            if (team1Count < 5) {
                team1[team1Count++] = players[i];
            } else if (team2Count < 5) {
                team2[team2Count++] = players[i];
            }
        }

        return { team1, team2 };
    }
    return null;
}

function createBalancedTeamRecursive(players) {
    if (players.length === 0)
    {
      return null;
    }

    const limitedPlayers = players.slice(0, 10); // Limit players to 10 for matchmaking lobby
    let team1 = [];
    let team2 = [];

    assignPlayers(limitedPlayers, team1, team2, 0);
    return { team1, team2 };
}

function assignPlayers(limitedPlayers, team1, team2, index) {
    if (index >= limitedPlayers.length)
    {
      return;
    }

    if (team1.length < 5) {
        team1[team1.length] = limitedPlayers[index]; // Using array length to add element
    } else if (team2.length < 5) {
        team2[team2.length] = limitedPlayers[index]; // Using array length to add element
    }

    assignPlayers(limitedPlayers, team1, team2, index + 1);
}