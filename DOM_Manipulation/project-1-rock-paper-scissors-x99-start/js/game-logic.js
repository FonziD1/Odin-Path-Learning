// Global variables representing Player One moves and values
var playerOneMoveOneType;
var playerOneMoveTwoType;
var playerOneMoveThreeType;
var playerOneMoveOneValue;
var playerOneMoveTwoValue;
var playerOneMoveThreeValue;

// Global variables representing Player Two moves and values
var playerTwoMoveOneType;
var playerTwoMoveTwoType;
var playerTwoMoveThreeType;
var playerTwoMoveOneValue;
var playerTwoMoveTwoValue;
var playerTwoMoveThreeValue;

/**
 * Validates whether a move type is valid ('rock', 'paper', or 'scissors').
 */
function isValidType(type) {
  return type === 'rock' || type === 'paper' || type === 'scissors';
}

/**
 * Validates whether a move value is valid (number >= 1 and <= 99).
 */
function isValidValue(value) {
  return typeof value === 'number' && value >= 1 && value <= 99;
}

/**
 * Sets the moves for the specified player if all parameters are valid.
 */
function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {
  if (player !== 'Player One' && player !== 'Player Two') {
    return;
  }

  if (!isValidType(moveOneType) || !isValidType(moveTwoType) || !isValidType(moveThreeType)) {
    return;
  }

  if (!isValidValue(moveOneValue) || !isValidValue(moveTwoValue) || !isValidValue(moveThreeValue)) {
    return;
  }

  if (moveOneValue + moveTwoValue + moveThreeValue > 99) {
    return;
  }

  if (player === 'Player One') {
    playerOneMoveOneType = moveOneType;
    playerOneMoveOneValue = moveOneValue;
    playerOneMoveTwoType = moveTwoType;
    playerOneMoveTwoValue = moveTwoValue;
    playerOneMoveThreeType = moveThreeType;
    playerOneMoveThreeValue = moveThreeValue;
  } else if (player === 'Player Two') {
    playerTwoMoveOneType = moveOneType;
    playerTwoMoveOneValue = moveOneValue;
    playerTwoMoveTwoType = moveTwoType;
    playerTwoMoveTwoValue = moveTwoValue;
    playerTwoMoveThreeType = moveThreeType;
    playerTwoMoveThreeValue = moveThreeValue;
  }
}

/**
 * Helper function to evaluate the winner of a single round given move types and values.
 */
function evaluateRoundWinner(type1, val1, type2, val2) {
  if (!isValidType(type1) || !isValidType(type2) || !isValidValue(val1) || !isValidValue(val2)) {
    return null;
  }

  if (type1 === type2) {
    if (val1 > val2) {
      return 'Player One';
    } else if (val2 > val1) {
      return 'Player Two';
    } else {
      return 'Tie';
    }
  }

  if (type1 === 'rock') {
    return type2 === 'scissors' ? 'Player One' : 'Player Two';
  } else if (type1 === 'paper') {
    return type2 === 'rock' ? 'Player One' : 'Player Two';
  } else if (type1 === 'scissors') {
    return type2 === 'paper' ? 'Player One' : 'Player Two';
  }

  return null;
}

/**
 * Returns the winner for a specific round (1, 2, or 3).
 */
function getRoundWinner(round) {
  switch (round) {
    case 1:
      return evaluateRoundWinner(playerOneMoveOneType, playerOneMoveOneValue, playerTwoMoveOneType, playerTwoMoveOneValue);
    case 2:
      return evaluateRoundWinner(playerOneMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoType, playerTwoMoveTwoValue);
    case 3:
      return evaluateRoundWinner(playerOneMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeType, playerTwoMoveThreeValue);
    default:
      return null;
  }
}

/**
 * Compares moves for the whole game and returns 'Player One', 'Player Two', or 'Tie'.
 */
function getGameWinner() {
  const round1Winner = getRoundWinner(1);
  const round2Winner = getRoundWinner(2);
  const round3Winner = getRoundWinner(3);

  if (round1Winner === null || round2Winner === null || round3Winner === null) {
    return null;
  }

  let playerOneScore = 0;
  let playerTwoScore = 0;

  const rounds = [round1Winner, round2Winner, round3Winner];
  for (let i = 0; i < rounds.length; i++) {
    if (rounds[i] === 'Player One') {
      playerOneScore++;
    } else if (rounds[i] === 'Player Two') {
      playerTwoScore++;
    }
  }

  if (playerOneScore > playerTwoScore) {
    return 'Player One';
  } else if (playerTwoScore > playerOneScore) {
    return 'Player Two';
  } else {
    return 'Tie';
  }
}

/**
 * Chooses three random moves for player two (Player Two) that sum to 99 in value.
 */
function setComputerMoves() {
  const types = ['rock', 'paper', 'scissors'];

  const moveOneType = types[Math.floor(Math.random() * types.length)];
  const moveTwoType = types[Math.floor(Math.random() * types.length)];
  const moveThreeType = types[Math.floor(Math.random() * types.length)];

  const moveOneValue = Math.floor(Math.random() * 97) + 1;
  const moveTwoValue = Math.floor(Math.random() * (99 - moveOneValue - 1)) + 1;
  const moveThreeValue = 99 - moveOneValue - moveTwoValue;

  setPlayerMoves('Player Two', moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue);
}