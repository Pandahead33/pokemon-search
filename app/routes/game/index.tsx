import { Autocomplete, Button, RangeSlider, Slider } from "@mantine/core";
import { forwardRef, useState } from "react";
import allPokemon from "~/data/pokemon.json";
import {
  DEFAULT_GENERATION_COUNTS,
  DEFAULT_TYPE_COUNT,
  types,
  generationLabels,
} from "~/data/constants";
import PokemonDetails from "~/components/PokemonDetails";

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      {value}
    </div>
  )
);

const GameTitle = () => <h1 className="mb-12">Who's That Pokemon?</h1>;

const PokeGuessingGame = () => {
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [showPokemonDetails, setShowPokemonDetails] = useState(false);

  return (
    <div className="grid place-items-center">
      <GameTitle />
      <div className="flex max-w-sm space-x-2 mb-8">
        <Autocomplete
          itemComponent={AutoCompleteItem}
          placeholder="Pick a pokemon..."
          data={allPokemon.map((pokemon) => pokemon?.name)}
          value={selectedPokemon}
          onChange={setSelectedPokemon}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setShowPokemonDetails(true);
            }
          }}
        />
        <Button
          variant="gradient"
          gradient={{ from: "grape", to: "pink", deg: 35 }}
          onClick={() => {
            setShowPokemonDetails(true);
          }}
        >
          Guess!
        </Button>
      </div>
      {selectedPokemon.length > 0 && showPokemonDetails && (
        <PokemonDetails
          pokemon={allPokemon?.find(
            (pokemon) => pokemon?.name === selectedPokemon
          )}
          pokedexNumber={
            allPokemon?.findIndex(
              (pokemon) => pokemon?.name === selectedPokemon
            ) + 1
          }
          setShowPokemonDetails={setShowPokemonDetails}
        />
      )}
      <div className="flex flex-col w-64">
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
        <div className="mt-12">
          <PokemonCharacteristicStats />
          <ul>
            {filteredPokemon.map((each) => (
              <>
                <li>{each.name}</li>
                <ul>
                  <li>Height(m): {each.height_m}</li>
                  <li>Weight (kg): {each.weight_kg}</li>
                </ul>
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokeGuessingGame;
