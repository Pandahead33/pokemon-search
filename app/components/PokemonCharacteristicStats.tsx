import {
  DEFAULT_GENERATION_COUNTS,
  DEFAULT_TYPE_COUNT,
  generationLabels,
} from "~/data/constants";

const pokemonTypeReducer = (allTypes, pokemon) => {
  return {
    ...allTypes,
    [pokemon.type_1]: allTypes[pokemon.type_1] + 1,
  };
};

const pokemonGenerationReducer = (allGenerations, pokemon) => {
  return {
    ...allGenerations,
    [pokemon.generation]: allGenerations[pokemon.generation] + 1,
  };
};

const pokemonWeightReducer = (totalWeight, pokemon) =>
  totalWeight + pokemon.weight_kg;

const pokemonHeightReducer = (totalHeight, pokemon) =>
  totalHeight + pokemon.height_m;

const median = (values) => {
  if (values.length === 0) return 0;

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};

const getAveragePokemonWeight = (pokemon) =>
  pokemon.reduce(pokemonWeightReducer, 0) / pokemon.length;

const getAveragePokemonHeight = (pokemon) =>
  pokemon.reduce(pokemonHeightReducer, 0) / pokemon.length;

const getPokemonTypes = (pokemon) =>
  pokemon.reduce(pokemonTypeReducer, DEFAULT_TYPE_COUNT);

const getPokemonGenerations = (pokemon) =>
  pokemon.reduce(pokemonGenerationReducer, DEFAULT_GENERATION_COUNTS);

const PokemonCharacteristicStats = ({ inputPokemon }) => {
  const pokemonWeights = inputPokemon.map((pokemon) => pokemon.weight_kg);
  const pokemonHeights = inputPokemon.map((pokemon) => pokemon.height_m);
  const pokemonGenerations = getPokemonGenerations(inputPokemon);
  const pokemonTypes = getPokemonTypes(inputPokemon);

  return (
    <div className="w-full">
      <p>Total: {inputPokemon?.length}</p>
      <p>
        # of Dual Types:{" "}
        {inputPokemon.filter((pokemon) => pokemon.type_2.length > 0).length}
      </p>
      <p>Weight</p>
      <ul>
        <li>Average: {getAveragePokemonWeight(inputPokemon).toFixed(1)}</li>
        <li>Median: {median(pokemonWeights)}</li>
        <li>Max: {Math.max(...pokemonWeights)}</li>
        <li>Min: {Math.min(...pokemonWeights)}</li>
      </ul>
      <p>Height</p>
      <ul>
        <li>Average: {getAveragePokemonHeight(inputPokemon).toFixed(1)}</li>
        <li>Median: {median(pokemonHeights)}</li>
        <li>Max: {Math.max(...pokemonHeights)}</li>
        <li>Min: {Math.min(...pokemonHeights)}</li>
      </ul>
      <div className="my-8">
          {Object.keys(pokemonTypes).map((type) => (
            <div className="flex justify-between odd:bg-slate-100 p-2">
              <span className="font-bold">{type}</span>
              <span>{pokemonTypes[type]}</span>
            </div>
          ))}
        </div>
        <div className="my-8">
          {Object.keys(pokemonGenerations).map((generation) => (
            <div className="flex justify-between odd:bg-slate-100 p-2">
              <span className="font-bold">{generationLabels[generation]}</span>
              <span>{pokemonGenerations[generation]}</span>
            </div>
          ))}
        </div>
    </div>
  );
};

export default PokemonCharacteristicStats;
