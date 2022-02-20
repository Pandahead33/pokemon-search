export const generationLabels = {
  1: "First",
  2: "Second",
  3: "Third",
  4: "Fourth",
  5: "Fifth",
  6: "Sixth",
  7: "Seventh",
  8: "Eighth",
};

export const DEFAULT_GENERATION_COUNTS = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

export const types = {
  WATER: "Water",
  FIRE: "Fire",
  BUG: "Bug",
  NORMAL: "Normal",
  ELECTRIC: "Electric",
  GROUND: "Ground",
  POISON: "Poison",
  FAIRY: "Fairy",
  FIGHTING: "Fighting",
  PSYCHIC: "Psychic",
  GRASS: "Grass",
  GHOST: "Ghost",
  DARK: "Dark",
  ICE: "Ice",
  ROCK: "Rock",
  DRAGON: "Dragon",
  STEEL: "Steel",
  FLYING: "Flying",
};

export const DEFAULT_TYPE_COUNT = Object.values(types).reduce(
  (allTypes, type) => ({
    ...allTypes,
    [type]: 0,
  }),
  {}
);
