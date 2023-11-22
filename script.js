let totalVotes = 0;

function vote(game) {
    // Simulate backend logic to store votes
    totalVotes++;
    
    // Update the frontend to reflect the new total
    document.getElementById('result').innerText = `Total Votes: ${totalVotes}`;
}
// Check if the user has a 'voted' cookie
let hasVoted = document.cookie.includes('voted=true');

// Function to set a 'voted' cookie
function setVotedCookie() {
    document.cookie = 'voted=true; max-age=2592000'; // Cookie expires in 30 days
}

// Voting function
function vote(game) {
    if (!hasVoted) {
        // Simulate backend logic to store votes
        totalVotes++;

        // Update the frontend to reflect the new total
        document.getElementById('result').innerText = `Total Votes: ${totalVotes}`;

        // Disable voting buttons after the user votes
        document.querySelectorAll('.options button').forEach(button => {
            button.disabled = true;
        });

        // Update the voting status
        hasVoted = true;

        // Set a 'voted' cookie
        setVotedCookie();
    } else {
        alert('You have already voted. Thank you!');
    }
}

// Check for 'voted' cookie on page load
window.onload = function () {
    if (hasVoted) {
        // If the user has voted, disable voting buttons
        document.querySelectorAll('.options button').forEach(button => {
            button.disabled = true;
        });
    }
};
