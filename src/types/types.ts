export interface CharacterApiResponse {
  results: Character[];
}

export interface Character {
  birth_year: string;
  created: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface Planet {
  name: string;
  url?: string;
}

export interface Film {
  title: string;
  url?: string;
}
