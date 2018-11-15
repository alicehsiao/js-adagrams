const Adagrams = {
  drawLetters() {
    const letters = {
      A: 9,
      B: 2,
      C: 2,
      D: 4,
      E: 12,
      F: 2,
      G: 3,
      H: 2,
      I: 9,
      J: 1,
      K: 1,
      L: 4,
      M: 2,
      N: 6,
      O: 8,
      P: 2,
      Q: 1,
      R: 6,
      S: 4,
      T: 6,
      U: 4,
      V: 2,
      W: 2,
      X: 1,
      Y: 2,
      Z: 1
    }

    let letterProbability = [];
    for (const letter in letters) {
      while (letters[letter] > 0) {
        letterProbability.push(letter);
        letters[letter] -= 1;
      }
    }

    let yourHand = [];
    let count = 0;
    while (count < 10) {
      let index = Math.floor(Math.random() * (letterProbability.length));
      yourHand.push(letterProbability[index]);
      count += 1;
      letterProbability.splice(index,1);
    }

    return yourHand;
  },
  usesAvailableLetters(input, lettersInHand) {
    let word = input.toUpperCase().split("");

    if(word.length > lettersInHand.length){
      return false;
    } else {
      for(const letter of word){
        let wordCount = word.filter(x => x==letter).length;
        let handCount = lettersInHand.filter(x => x==letter).length;
        if(wordCount > handCount){
          return false;
        }
      }
    }

    return true;
  },
  scoreWord(word){
    const words = word.toUpperCase().split("");
    let score = 0;
    const allScores = {
      A: 1,
      E: 1,
      I: 1,
      O: 1,
      U: 1,
      L: 1,
      N: 1,
      R: 1,
      S: 1,
      T: 1,
      D: 2,
      G: 2,
      B: 3,
      C: 3,
      M: 3,
      P: 3,
      F: 4,
      H: 4,
      V: 4,
      W: 4,
      Y: 4,
      K: 5,
      J: 8,
      X: 8,
      Q: 10,
      Z: 10,
    }

    for(const letter of words){
      score += allScores[letter]
    }

    if(word.length >= 7){
      score += 8;
    }

    return score;
  },
  highestScoreFrom(words){
    let scores = {};
    for(const word of words){
      scores[word] = this.scoreWord(word);
    }

    // Finds the max score of all words
    const maxScore = Object.values(scores).sort((a,b) => b - a)[0];

    // Finds all words with the max score
    const maxWords = Object.keys(scores).filter(word => scores[word] == maxScore);

    if (maxWords.length == 1) {
      return { word: maxWords[0], score: maxScore };
    } else {
      let minLength = Math.min(...maxWords.map(word => word.length));
      let bestWords = maxWords.filter(word => word.length == minLength || word.length == 10);

      if (bestWords.length == 1){
        return {word: bestWords[0], score: maxScore};
      } else if (bestWords.length > 1) {
        for (const word of bestWords) {
          if (word.length == 10) {
            return {word: word, score: scores[word]};
          }
        }
        return {word: bestWords[0], score: maxScore};
      }
    }
  }
};

// Do not remove this line or your tests will break!
export default Adagrams;
