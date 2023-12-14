const input = await Bun.file("./packages/2023/src/day07/input.txt").text();
const lines = input.split("\n");

const CARD_VALUES = {
  "A": 0,
  "K": 1,
  "Q": 2,
  "T": 3,
  "9": 4,
  "8": 5,
  "7": 6,
  "6": 7,
  "5": 8,
  "4": 9,
  "3": 10,
  "2": 11,
  "J": 12,
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

    let j = 0;

    for (const card of this.cards) {
      const oldValue = this.frequencies.get(card);
      if (oldValue) {
        this.frequencies.set(card, oldValue + 1);
      } else {
        if (card === "J") {
          j++;
        } else {
          this.frequencies.set(card, 1);
        }
      }
    }

    const counts = [...this.frequencies.values()].sort().toReversed();
    if (counts.length === 0) {
      counts.push(0);
    }
    if (counts[0] + j === 5) {
      this.rank = 0;
    } else if (counts[0] + j === 4) {
      this.rank = 1;
    } else if (counts[0] + j === 3 && counts[1] === 2) {
      this.rank = 2;
    } else if (counts[0] + j === 3) {
      this.rank = 3;
    } else if (counts[0] === 2 && (j > 0 || counts[1] === 2)) {
      this.rank = 4;
    } else if (counts[0] === 2 || j > 0) {
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
