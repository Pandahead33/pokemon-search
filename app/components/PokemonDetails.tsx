import { Image, Loader } from "@mantine/core";
import { useState } from "react";

const PokemonDetailListItem = (props) => {
  const { label, value } = props;

  return (
    <li className="flex justify-between odd:bg-slate-100 text-lg">
      <span className="font-bold">{label}:</span>
      <span>{value}</span>
    </li>
  );
};

const PokemonDetails = ({ pokemon, pokedexNumber, setShowPokemonDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  if (!pokemon) return setShowPokemonDetails(false) ?? null;

  const {
    name,
    generation,
    type_1: primaryType,
    type_2: secondaryType,
    height_m: heightInMeters,
    weight_kg: weightInKilometers,
  } = pokemon;

  return (
    <>
      <div className="w-24 h-24">
        <Image
          className="w-full"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedexNumber}.png`}
          onLoadStart={() => {
            console.log("hello");
            setImageLoaded(true)
        }}
        />
      </div>
      <ul className="list-none p-0 w-full max-w-xs l sm:w-80">
        <PokemonDetailListItem label="Name" value={name} />
        <PokemonDetailListItem label="Generation" value={generation} />
        <PokemonDetailListItem label="Primary Type" value={primaryType} />
        {secondaryType && (
          <PokemonDetailListItem label="Secondary Type" value={secondaryType} />
        )}
        <PokemonDetailListItem
          label="Height (m)"
          value={heightInMeters.toFixed(1)}
        />
        <PokemonDetailListItem
          label="Weight (kg)"
          value={weightInKilometers.toFixed(1)}
        />
      </ul>
    </>
  );
};

export default PokemonDetails;
