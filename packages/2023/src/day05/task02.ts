// THIS CODE IS SUPER SLOW, TOOK LIKE 7 MINUTES
const input = await Bun.file("./packages/2023/src/day05/input.txt").text();
const lines = input.split("\n\n");

type Range = {
  srcStart: number;
  dstStart: number;
  length: number;
};

class Mapping {
  private cache: Map<number, number> = new Map();
  private ranges: Range[] = [];

  constructor(mappingString: string) {
    const rangeStrings = mappingString.split("\n").toSpliced(0, 1);
    for (const rangeString of rangeStrings) {
      const numbers = rangeString.split(" ").map((s) => parseInt(s));
      this.ranges.push({
        dstStart: numbers[0],
        srcStart: numbers[1],
        length: numbers[2],
      });
    }
  }

  get(key: number) {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    for (const range of this.ranges) {
      const min = range.srcStart;
      const max = min + range.length;
      if (min <= key && key <= max) {
        const offset = key - min;
        return range.dstStart + offset;
      }
    }
    return key;
  }
}

const rangeStrings = lines[0]
  .substring(lines[0].indexOf(":") + 1)
  .trim()
  .split(" ")
  .map((s) => parseInt(s));

const seedRanges = [];
for (let i = 0; i < rangeStrings.length; i += 2) {
  seedRanges.push([rangeStrings[i], rangeStrings[i + 1]] as const);
}

const seedToSoil = new Mapping(lines[1]);
const soilToFertilizer = new Mapping(lines[2]);
const fertilizerToWater = new Mapping(lines[3]);
const waterToLight = new Mapping(lines[4]);
const lightToTemperature = new Mapping(lines[5]);
const temperatureToHumidity = new Mapping(lines[6]);
const humidityToLocation = new Mapping(lines[7]);

let min = Number.POSITIVE_INFINITY;
// handling the first range of seeds
for (const [start, length] of seedRanges) {
  for (let seed = start; seed < start + length; seed++) {
    const location = humidityToLocation.get(
      temperatureToHumidity.get(
        lightToTemperature.get(
          waterToLight.get(fertilizerToWater.get(soilToFertilizer.get(seedToSoil.get(seed))))
        )
      )
    );

    if (location < min) {
      min = location;
    }
  }
}

console.log(min);
