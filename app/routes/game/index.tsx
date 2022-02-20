import { Autocomplete, Button } from "@mantine/core";
import { forwardRef, useState } from "react";
import allPokemon from "~/data/pokemon.json";
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
    </div>
  );
};

export default PokeGuessingGame;
