// Function to represent a player
function createPlayer(id, rank, role, partySize) {
    return {
        playerId: id,
        rank: rank,
        role: role,
        partySize: partySize,
        printPlayer: function() {
            console.log(Player(${this.playerId}, Rank: {this.rank}, Role: ${this.role}, Party Size: ${this.partySize}));
        }
    };
}

// Function for simple matchmaking
function simpleMatchmaking(queue, maxPartySize) {
    const matchedTeams = [];
    const currentTeam = [];
    let partyCount = 0;

    // Match players sequentially in queue
    for (const player of queue) {
        if (partyCount + player.partySize <= maxPartySize) {
            currentTeam.push(player);
            partyCount += player.partySize;
        }

        if (partyCount === maxPartySize) {
            matchedTeams.push([...currentTeam]); // Copy team to matched teams list
            currentTeam.length = 0; // Reset current team
            partyCount = 0; // Reset party count
        }
    }

    // Add remaining players to the last team
    if (currentTeam.length > 0) {
        matchedTeams.push([...currentTeam]);
    }

    return matchedTeams;
}

// Function to create random player simulation
function createRandomPlayers(numPlayers) {
    const ranks = ["Warrior", "Elite", "Master", "Grandmaster", "Epic", "Legend", "Mythic"];
    const roles = ["Tank", "Marksman", "Mage", "Support", "Assassin"];
    const players = [];
    const rand = () => Math.floor(Math.random() * ranks.length);

    for (let i = 1; i <= numPlayers; i++) {
        const rank = ranks[rand()];
        const role = roles[rand()];
        const partySize = Math.floor(Math.random() * 5) + 1; // Party size between 1 and 5
        players.push(createPlayer(i, rank, role, partySize));
    }

    return players;
}

// Main function
function main() {
    const numPlayers = 30; // Simulate 30 players in queue
    const queue = createRandomPlayers(numPlayers);

    // Perform simple matchmaking
    const matchedTeams = simpleMatchmaking(queue, 5);

    // Display matchmaking results
    for (let i = 0; i < matchedTeams.length; i++) {
        console.log(Team ${i + 1}:);
        for (const player of matchedTeams[i]) {
            player.printPlayer();
        }
        console.log("----------");
    }
}