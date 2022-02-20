import {
  Box,
  Checkbox,
  CloseButton,
  MultiSelect,
  NumberInput,
  Table,
  Image,
  Tabs,
} from "@mantine/core";
import { forwardRef, useState } from "react";
import { Outlet } from "remix";
import { types } from "~/data/constants";
import { typeIcons } from "~/data/icons";
import allPokemon from "~/data/pokemon.json";
import PokemonCharacteristicStats from "~/components/PokemonCharacteristicStats";

const getNumberWithOrdinal = (n: number) => {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const ALL_GENERATIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const SelectItem = forwardRef(({ label, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Box sx={{ display: "flex" }}>
      <Box mr={10}>{typeIcons[label]}</Box>
      <div>{label}</div>
    </Box>
  </div>
));

const PokemonTypeValueItem = ({ value, label, onRemove, classNames, ...others }) => {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          border: `1px solid ${theme.colors.gray[4]}`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <div style={{ marginRight: 10 }}>{typeIcons[label]}</div>
        <div style={{ lineHeight: 1, fontSize: 12 }}>{label}</div>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}

const PokemonTypeBox = ({ type }) => (
  <div>
    <Box
      sx={(theme) => ({
        display: "flex",
        cursor: "default",
        alignItems: "center",
        border: `1px solid ${theme.colors.gray[4]}`,
        paddingLeft: 4,
        paddingRight: 4,
        marginRight: 4,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 4,
        backgroundColor: "#FFFFFF",
      })}
    >
      <div style={{ marginRight: 10 }}>{typeIcons[type]}</div>
      <div style={{ lineHeight: 1, fontSize: 12 }}>{type}</div>
    </Box>
  </div>
);

const PokemonSearchResultTableHeadings = () => (
  <thead>
    <tr>
      <th>Name</th>
      <th>Gen</th>
      <th>Type</th>
      <th>Weight (kg)</th>
      <th>Height (m)</th>
    </tr>
  </thead>
);

const PokemonSearchResultRows = ({ searchResults }) => (
  <tbody>
    {searchResults.map((pokemon) => (
      <tr key={pokemon.name} className="odd:bg-slate-100">
        <td>
          <div className="flex justify-between items-center">
            <Image
              className="w-10"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                allPokemon?.findIndex(
                  (nextPokemon) => nextPokemon?.name === pokemon.name
                ) + 1
              }.png`}
            />
            {pokemon.name}
          </div>
        </td>
        <td>
          <div className="text-center">
            {getNumberWithOrdinal(pokemon.generation)}
          </div>
        </td>
        <td>
          <div className="flex">
            <PokemonTypeBox type={pokemon.type_1} />
            {pokemon.type_2 && <PokemonTypeBox type={pokemon.type_2} />}
          </div>
        </td>
        <td>{pokemon.weight_kg}</td>
        <td>{pokemon.height_m}</td>
      </tr>
    ))}
  </tbody>
);

const PokemonSearchResults = ({ searchResults }) => (
  <Table highlightOnHover verticalSpacing="md" horizontalSpacing="sm">
    <PokemonSearchResultTableHeadings />
    <PokemonSearchResultRows searchResults={searchResults} />
  </Table>
);

const GenerationCheckboxes = ({
  selectedGenerations,
  setSelectedGenerations,
}) => (
  <div className="w-48">
    <Checkbox
      className="my-2"
      label="Select all"
      checked={selectedGenerations.length === 8}
      onChange={(event) =>
        setSelectedGenerations(event.target.checked ? ALL_GENERATIONS : [])
      }
    />
    <div className="ml-8 grid grid-cols-2">
      {[1, 5, 2, 6, 3, 7, 4, 8].map((generation) => (
        <Checkbox
          className="my-2"
          label={`Gen ${generation}`}
          checked={selectedGenerations.includes(generation)}
          onChange={(event) => {
            setSelectedGenerations(
              event.currentTarget.checked
                ? [...selectedGenerations, generation]
                : selectedGenerations.filter(
                    (existingGeneration) => existingGeneration !== generation
                  )
            );
          }}
        />
      ))}
    </div>
  </div>
);

const ResultsTab = ({ filteredPokemon }) => (
  <>
    <PokemonSearchResults searchResults={filteredPokemon} />
  </>
);

export default function Index() {
  const [selectedGenerations, setSelectedGenerations] =
    useState(ALL_GENERATIONS);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isMonotype, setIsMonotype] = useState(false);
  const [shouldFilterOutMonotypes, setShouldFilterOutMonotypes] =
    useState(false);
  const [excludedTypes, setExcludedTypes] = useState([]);
  const [minHeight, setMinHeight] = useState(0.1);
  const [minWeight, setMinWeight] = useState(0.1);
  const [maxHeight, setMaxHeight] = useState(20);
  const [maxWeight, setMaxWeight] = useState(999.9);
  const [activeTab, setActiveTab] = useState(0);
  const [filterTab, setFilterTab] = useState(0);

  const filteredPokemon = allPokemon.filter(
    (pokemon) =>
      selectedGenerations.includes(pokemon.generation) &&
      (!selectedTypes[0] ||
        pokemon.type_1 === selectedTypes[0] ||
        selectedTypes[0] === "Any (Wildcard)") &&
      (!selectedTypes[1] || pokemon.type_2 === selectedTypes[1]) &&
      ((isMonotype && pokemon.type_2 === "") || !isMonotype) &&
      !excludedTypes.includes(pokemon.type_1) &&
      !excludedTypes.includes(pokemon.type_2) &&
      pokemon.height_m >= minHeight &&
      pokemon.height_m <= maxHeight &&
      pokemon.weight_kg >= minWeight &&
      pokemon.weight_kg <= maxWeight &&
      (!shouldFilterOutMonotypes ||
        (shouldFilterOutMonotypes && pokemon.type_2 !== ""))
  );

  return (
    <div className="grid place-items-center w-full">
      <Outlet />
      <h1 className="text-3xl">Pokemon Search!</h1>
      <p className="text-base mb-8 w-96">
        Use this tool to narrow down a list of Pokemon by their characteristics.
        Search and sort by generation, weight, height, primary type, and
        secondary type.
      </p>
      <Tabs className="w-96 h-64" active={filterTab} onTabChange={setFilterTab}>
        <Tabs.Tab label="Typing">
          <MultiSelect
            data={[...Object.values(types), "Any (Wildcard)"]}
            value={selectedTypes}
            onChange={setSelectedTypes}
            label="Primary/Secondary Type"
            placeholder="Pick types (in order)..."
            itemComponent={SelectItem}
            valueComponent={PokemonTypeValueItem}
            searchable
            clearable
            nothingFound="Nothing. Try another type!"
            maxSelectedValues={2}
          />
          <div className="grid grid-cols-2 mb-3">
            <Checkbox
              className="my-2"
              label="Monotype"
              checked={isMonotype}
              onChange={(event) => setIsMonotype(event.currentTarget.checked)}
            />
            <Checkbox
              className="my-2"
              label="Filter Out Monotypes"
              checked={shouldFilterOutMonotypes}
              onChange={(event) =>
                setShouldFilterOutMonotypes(event.currentTarget.checked)
              }
            />
          </div>
          <MultiSelect
            data={Object.values(types)}
            value={excludedTypes}
            onChange={setExcludedTypes}
            label="Types to Not Include"
            placeholder="Select multiple types..."
            itemComponent={SelectItem}
            valueComponent={PokemonTypeValueItem}
            searchable
            clearable
            nothingFound="Nothing. Try another type!"
          />
        </Tabs.Tab>
        <Tabs.Tab label="Physical Characteristics">
          <div className="w-60 grid grid-cols-2 gap-5 mb-5">
            <NumberInput
              value={minWeight}
              onChange={setMinWeight}
              step={0.1}
              min={0.1}
              max={999.9}
              precision={1}
              label="Min Weight (kg)"
            />
            <NumberInput
              value={maxWeight}
              onChange={setMaxWeight}
              step={0.1}
              min={0.1}
              max={999.9}
              precision={1}
              label="Max Weight (kg)"
            />
          </div>
          <div className="w-60 grid grid-cols-2 gap-5">
            <NumberInput
              value={minHeight}
              onChange={setMinHeight}
              step={0.1}
              min={0.1}
              max={20}
              precision={1}
              label="Min Height (m)"
            />
            <NumberInput
              value={maxHeight}
              onChange={setMaxHeight}
              step={0.1}
              min={0.1}
              max={20}
              precision={1}
              label="Max Height (m)"
            />
          </div>
        </Tabs.Tab>
        <Tabs.Tab label="Generations">
          <GenerationCheckboxes
            selectedGenerations={selectedGenerations}
            setSelectedGenerations={setSelectedGenerations}
          />
        </Tabs.Tab>
      </Tabs>
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl">Results</h2>
        <p>Total: {filteredPokemon.length}</p>
        <Tabs active={activeTab} onTabChange={setActiveTab}>
          <Tabs.Tab label="Search">
            <ResultsTab filteredPokemon={filteredPokemon} />
          </Tabs.Tab>
          <Tabs.Tab label="Stats">
            <PokemonCharacteristicStats inputPokemon={filteredPokemon || []} />
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
}
