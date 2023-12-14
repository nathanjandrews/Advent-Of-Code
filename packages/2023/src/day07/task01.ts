const input = await Bun.file("./packages/2023/src/day07/input.txt").text();
const lines = input.split("\n");

const CARD_VALUES = {
  "A": 0,
  "K": 1,
  "Q": 2,
  "J": 3,
  "T": 4,
  "9": 5,
  "8": 6,
  "7": 7,
  "6": 8,
  "5": 9,
  "4": 10,
  "3": 11,
  "2": 12,
};

class Hand {
  cards: string[];
  frequencies: Map<string, number> = new Map();
  bid: number;
  rank: number;

  constructor(line: string) {
    const [cardsString, bidString] = line.trim().split(" ");
    this.cards = cardsString.split("");
    this.bid = parseInt(bidString);

    for (const card of this.cards) {
      const oldValue = this.frequencies.get(card);
      if (oldValue) {
        this.frequencies.set(card, oldValue + 1);
      } else {
        this.frequencies.set(card, 1);
      }
    }

    let has3 = false;
    let hasFirstPair = false;
    let hasSecondPair = false;
    for (const [_, frequency] of this.frequencies) {
      if (frequency === 5) {
        this.rank = 0;
        return;
      }

      if (frequency === 4) {
        this.rank = 1;
        return;
      }

      if (frequency === 3) {
        has3 = true;
      }

      if (frequency === 2) {
        if (!hasFirstPair) {
          hasFirstPair = true;
          continue;
        }

        if (hasFirstPair) {
          hasSecondPair = true;
        }
      }
    }

    if (has3 && hasFirstPair) {
      this.rank = 2;
    } else if (has3) {
      this.rank = 3;
    } else if (hasFirstPair && hasSecondPair) {
      this.rank = 4;
    } else if (hasFirstPair) {
      this.rank = 5;
    } else {
      this.rank = 6;
    }
  }
}

function compare(h1: Hand, h2: Hand) {
  const rankDifference = h1.rank - h2.rank;
  if (rankDifference !== 0) {
    return rankDifference;
  }

  for (let i = 0; i < h1.cards.length; i++) {
    const cardDifference =
      CARD_VALUES[h1.cards[i] as keyof typeof CARD_VALUES] -
      CARD_VALUES[h2.cards[i] as keyof typeof CARD_VALUES];

    if (cardDifference !== 0) {
      return cardDifference;
    }
  }

  return 0;
}

// Actual code starts here
const hands = lines.map((line) => new Hand(line));
hands.sort(compare).reverse();

let total = 0;
for (let i = 0; i < hands.length; i++) {
  total += (i + 1) * hands[i].bid;
}

console.log(total);
