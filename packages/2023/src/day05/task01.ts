const input = await Bun.file("./packages/2023/src/day05/input.txt").text();
const lines = input.split("\n\n");

type Range = {
  srcStart: number;
  dstStart: number;
  length: number;
};

class Mapping {
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

const seeds = lines[0]
  .substring(lines[0].indexOf(":") + 1)
  .trim()
  .split(" ")
  .map((s) => parseInt(s));

const seedToSoil = new Mapping(lines[1]);
const soilToFertilizer = new Mapping(lines[2]);
const fertilizerToWater = new Mapping(lines[3]);
const waterToLight = new Mapping(lines[4]);
const lightToTemperature = new Mapping(lines[5]);
const temperatureToHumidity = new Mapping(lines[6]);
const humidityToLocation = new Mapping(lines[7]);

let min = Number.POSITIVE_INFINITY;
for (const seed of seeds) {
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

console.log(min);
