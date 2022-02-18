import { Autocomplete, Button, Image, Loader } from "@mantine/core";
import { forwardRef, useState } from "react";
import allPokemon from "~/data/pokemon.json";
import { DEFAULT_TYPE_COUNT, types } from "~/data/constants";
import PokemonDetails from "~/components/PokemonDetails";

const pokemonTypeReducer = (allTypes, pokemon) => {
  return {
    ...allTypes,
    [pokemon.type_1]: allTypes[pokemon.type_1] + 1,
  };
};

const filteredPokemon = allPokemon.filter(
    (pokemon) =>
      pokemon.generation > 2 &&
      pokemon.generation < 5 &&
      pokemon.weight_kg < 29.0 &&
      pokemon.height_m < 1.0 &&
      pokemon.type_2 === "" &&
      pokemon.type_1 !== types.WATER
  );


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

  const pokemonTypes = filteredPokemon.reduce(
    pokemonTypeReducer,
    DEFAULT_TYPE_COUNT
  );

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
        <div>
          {Object.keys(pokemonTypes).map((type) => (
            <div className="flex justify-between odd:bg-slate-100 p-2">
              <span className="font-bold">{type}</span>
              <span>{pokemonTypes[type]}</span>
            </div>
          ))}
        </div>
        <div className="mt-12">
          Total: {filteredPokemon?.length}
          <ul>
            {filteredPokemon.map((each) => (
              <li>{each.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokeGuessingGame;
