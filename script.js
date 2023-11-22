let totalVotes = 0;

function vote(game) {
    // Simulate backend logic to store votes
    totalVotes++;
    
    // Update the frontend to reflect the new total
    document.getElementById('result').innerText = `Total Votes: ${totalVotes}`;
}
