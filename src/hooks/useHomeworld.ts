import { useState, useEffect } from "react";
import { getHomePlanetName } from "../utils/planetUtils";
import { Character } from "../types/types";

interface Planets {
  [key: string]: { name: string };
}

const useHomeWorld = (
  character: Character | undefined,
  planets: Planets | null
) => {
  const [homeWorld, setHomeWorld] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomePlanet = async () => {
      if (character?.homeworld) {
        if (planets && planets[character.homeworld]) {
          setHomeWorld(planets[character.homeworld]?.name ?? "Unknown");
        } else {
          const planetName = await getHomePlanetName(character.homeworld);
          setHomeWorld(planetName);
        }
      }
    };

    fetchHomePlanet();
  }, [planets, character]);

  return homeWorld;
};

export default useHomeWorld;
