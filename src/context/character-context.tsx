import React, { createContext, useContext, useEffect, useState } from "react";
import { Character, Film, Planet } from "../types/types";

interface CharacterContextType {
  characters: Character[] | null;
  planets: Record<string, Planet> | null;
  films: Record<string, Film> | null;
  loading: boolean;
  error: string | null;
}

const CharacterContext = createContext<CharacterContextType>({
  characters: null,
  planets: null,
  films: null,
  loading: true,
  error: null,
});

export const useCharacterContext = () => useContext(CharacterContext);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [planets, setPlanets] = useState<Record<string, Planet> | null>(null);
  const [films, setFilms] = useState<Record<string, Film> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/?page=1");
        const data = await response.json();
        setCharacters(data.results);
      } catch (error: unknown) {
        const typedError = error as { message: string };
        setError(typedError.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPlanetsAndFilms = async () => {
      try {
        const [planetsResponse, filmsResponse] = await Promise.all([
          fetchPlanets(),
          fetchFilms(),
        ]);
        setPlanets(planetsResponse);
        setFilms(filmsResponse);
      } catch (error: unknown) {
        const typedError = error as { message: string };
        setError(typedError.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchPlanets = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/planets/");
        const data = await response.json();
        const planetsMap: Record<string, Planet> = {};
        data.results.forEach((planet: Planet) => {
          if (planet.url) planetsMap[planet.url] = planet;
        });
        return planetsMap;
      } catch (error) {
        throw new Error("Error fetching planets");
      }
    };

    const fetchFilms = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/films/");
        const data = await response.json();
        const filmsMap: Record<string, Film> = {};
        data.results.forEach((film: Film) => {
          if (film.url) filmsMap[film.url] = film;
        });
        return filmsMap;
      } catch (error) {
        throw new Error("Error fetching films");
      }
    };

    fetchCharacters();
    fetchPlanetsAndFilms();
  }, []);

  return (
    <CharacterContext.Provider
      value={{ characters, planets, films, loading, error }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
