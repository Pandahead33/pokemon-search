import BugTypeIcon from "./icons/bug.svg";
import DarkTypeIcon from "./icons/dark.svg";
import DragonTypeIcon from "./icons/dragon.svg";
import ElectricTypeIcon from "./icons/electric.svg";
import FairyTypeIcon from "./icons/fairy.svg";
import FightingTypeIcon from "./icons/fighting.svg";
import FireTypeIcon from "./icons/fire.svg";
import FlyingTypeIcon from "./icons/flying.svg";
import GhostTypeIcon from "./icons/ghost.svg";
import GrassTypeIcon from "./icons/grass.svg";
import GroundTypeIcon from "./icons/ground.svg";
import IceTypeIcon from "./icons/ice.svg";
import NormalTypeIcon from "./icons/normal.svg";
import PoisonTypeIcon from "./icons/poison.svg";
import PsychicTypeIcon from "./icons/psychic.svg";
import RockTypeIcon from "./icons/rock.svg";
import SteelTypeIcon from "./icons/steel.svg";
import WaterTypeIcon from "./icons/water.svg";

type PokemonTypes = "Bug" | "Dark" | "Dragon" | "Electric" | "Fairy" | "Fighting" | "Fire" | "Flying" | "Ghost" | "Grass" | "Ground" | "Ice" | "Normal" | "Poison" | "Psychic" | "Rock" | "Steel" | "Water"

interface IconsProps {
    source: string,
    iconColor: string
}

const Icon = ({ source, iconColor } : IconsProps): JSX.Element => <span className={`${iconColor} w-5 h-5 rounded-full grid place-items-center`}>
    <img src={source} width={13} height={13} className="inline" />
</span>

export const typeIcons = {
  Bug: <Icon source={BugTypeIcon} iconColor="bg-lime-500" />,
  Dark: <Icon source={DarkTypeIcon} iconColor="bg-slate-800" />,
  Dragon: <Icon source={DragonTypeIcon} iconColor="bg-blue-600" />,
  Electric: <Icon source={ElectricTypeIcon} iconColor="bg-yellow-300" />,
  Fairy: <Icon source={FairyTypeIcon} iconColor="bg-pink-300" />,
  Fighting: <Icon source={FightingTypeIcon} iconColor="bg-red-400" />,
  Fire: <Icon source={FireTypeIcon} iconColor="bg-orange-500" />,
  Flying: <Icon source={FlyingTypeIcon} iconColor="bg-sky-400" />,
  Ghost: <Icon source={GhostTypeIcon} iconColor="bg-purple-400" />,
  Grass: <Icon source={GrassTypeIcon} iconColor="bg-green-500" />,
  Ground: <Icon source={GroundTypeIcon} iconColor="bg-orange-600" />,
  Ice: <Icon source={IceTypeIcon} iconColor="bg-teal-300" />,
  Normal: <Icon source={NormalTypeIcon} iconColor="bg-slate-300" />,
  Poison: <Icon source={PoisonTypeIcon} iconColor="bg-fuchsia-500" />,
  Psychic: <Icon source={PsychicTypeIcon} iconColor="bg-pink-400" />,
  Rock: <Icon source={RockTypeIcon} iconColor="bg-amber-300" />,
  Steel: <Icon source={SteelTypeIcon} iconColor="bg-cyan-700" />,
  Water: <Icon source={WaterTypeIcon} iconColor="bg-cyan-500" />,
};
