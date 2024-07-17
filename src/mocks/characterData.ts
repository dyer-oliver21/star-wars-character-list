import { Character, Film, Planet } from "../types/types";

export const mockCharacterDetails = [
  {
    name: "Luke Skywalker",
    gender: "male",
    hair_color: "blond",
    eye_color: "blue",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/"],
  },
];

export const mockCharacter: Character = {
  birth_year: "19 BBY",
  created: "2014-12-09T13:50:51.644000Z",
  eye_color: "blue",
  films: ["https://swapi.dev/api/films/1/"],
  gender: "male",
  hair_color: "blond",
  height: "172",
  homeworld: "https://swapi.dev/api/planets/1/",
  mass: "77",
  name: "Luke Skywalker",
  skin_color: "fair",
  species: ["https://swapi.dev/api/species/1/"],
  starships: ["https://swapi.dev/api/starships/12/"],
  url: "https://swapi.dev/api/people/1/",
  vehicles: ["https://swapi.dev/api/vehicles/14/"],
};

export const mockPlanets: Record<string, Planet> = {
  "https://swapi.dev/api/planets/1/": {
    name: "Tatooine",
  },
};

export const mockCharacters: Character[] = [
  {
    birth_year: "19 BBY",
    created: "2014-12-09T13:50:51.644000Z",
    eye_color: "blue",
    films: ["https://swapi.dev/api/films/1/"],
    gender: "male",
    hair_color: "blond",
    height: "172",
    homeworld: "https://swapi.dev/api/planets/1/",
    mass: "77",
    name: "Luke Skywalker",
    skin_color: "fair",
    species: ["https://swapi.dev/api/species/1/"],
    starships: ["https://swapi.dev/api/starships/12/"],
    url: "https://swapi.dev/api/people/1/",
    vehicles: ["https://swapi.dev/api/vehicles/14/"],
  },
  {
    birth_year: "41.9BBY",
    created: "2014-12-10T15:18:20.704000Z",
    eye_color: "yellow",
    films: ["https://swapi.dev/api/films/1/"],
    gender: "male",
    hair_color: "none",
    height: "202",
    homeworld: "https://swapi.dev/api/planets/1/",
    mass: "136",
    name: "Darth Vader",
    skin_color: "white",
    species: ["https://swapi.dev/api/species/1/"],
    starships: ["https://swapi.dev/api/starships/13/"],
    url: "https://swapi.dev/api/people/4/",
    vehicles: [],
  },
];

export const mockFilms: Record<string, Film> = {
  "https://swapi.dev/api/films/1/": { title: "A New Hope" },
  "https://swapi.dev/api/films/2/": { title: "The Empire Strikes Back" },
};

export const filmUrls = [
  "https://swapi.dev/api/films/1/",
  "https://swapi.dev/api/films/2/",
];
