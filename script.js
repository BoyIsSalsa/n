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
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('YOUR_MONGODB_ATLAS_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true });

const voteSchema = new mongoose.Schema({
  user: String,
  game: String,
});

const Vote = mongoose.model('Vote', voteSchema);

app.use(express.json());

let totalVotes = 0; // Variable to store total votes in memory

// Load total votes from the database on server startup
(async () => {
  try {
    totalVotes = await Vote.countDocuments();
    console.log('Total votes loaded:', totalVotes);
  } catch (error) {
    console.error('Error loading total votes:', error);
  }
})();

app.post('/vote', async (req, res) => {
  const { user, game } = req.body;
  try {
    const newVote = new Vote({ user, game });
    await newVote.save();
    totalVotes++; // Increment total votes in memory
    res.status(201).json({ message: 'Vote recorded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/total-votes', (req, res) => {
  res.json({ totalVotes });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
