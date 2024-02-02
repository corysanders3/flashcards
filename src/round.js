const data = require('./data');
const prototypeQuestions = data.prototypeData;

function createRound(deck) {
    var newRound = {
        deck: deck,
        currentCard: deck[0],
        turns: 0,
        incorrectGuesses: []
    }
    return newRound;
};

function takeTurn(guess, round) {
    round.turns++
    if(guess === round.currentCard.correctAnswer) {
        round.currentCard = round.deck[round.turns];
        return 'Correct!';
    } else {
        round.incorrectGuesses.push(round.currentCard.id);
        round.currentCard = round.deck[round.turns];
        return 'Incorrect!';
    }
}

function calculatePercentCorrect(round) {
    const wins = round.turns - round.incorrectGuesses.length;
    const percentageWon = Math.round((wins/round.turns) * 100);
    return percentageWon;
}

function endRound(round) {
    if(round.turns === round.deck.length) {
        console.log(`** Round over! ** You answered ${calculatePercentCorrect(round)}% of the questions correctly!`);
        const missedQs = [];
        prototypeQuestions.forEach((question) => {
            round.incorrectGuesses.forEach((idNum) => {
                if(question.id === idNum) {
                    missedQs.push(question)
                }
            })
        })
        console.log('Here are the questions you missed, and the correct answer...')
        missedQs.forEach((q) => {
            console.log(`${q.id}: ${q.question}`)
            console.log(`Answer: ${q.correctAnswer}`)
        })
        return `** Round over! ** You answered ${calculatePercentCorrect(round)}% of the questions correctly!`;
    }
}

module.exports = { createRound, takeTurn, calculatePercentCorrect, endRound };
