import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterList from "../CharacterList";
import { useCharacterContext } from "../../../context/character-context";
import { Character } from "../../../types/types";

jest.mock("../../../context/character-context", () => ({
  ...jest.requireActual("../../../context/character-context"),
  useCharacterContext: jest.fn(),
}));

describe("CharacterList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state correctly", () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      characters: [],
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<CharacterList />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays error state correctly", () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      characters: [],
      loading: false,
      error: "Failed to fetch characters",
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<CharacterList />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Error: Failed to fetch characters")
    ).toBeInTheDocument();
  });

  it("renders list of characters correctly", () => {
    const mockCharacters: Character[] = [
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

    (useCharacterContext as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<CharacterList />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
  });
});
