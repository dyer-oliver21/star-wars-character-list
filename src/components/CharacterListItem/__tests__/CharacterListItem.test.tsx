import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterListItem from "../CharacterListItem";
import { useCharacterContext } from "../../../context/character-context";
import { Character } from "../../../types/types";

jest.mock("../../../context/character-context", () => ({
  ...jest.requireActual("../../../context/character-context"),
  useCharacterContext: jest.fn(),
}));

describe("CharacterListItem", () => {
  const mockCharacter: Character = {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays character details and homeworld correctly", async () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      planets: {
        "https://swapi.dev/api/planets/1/": { name: "Tatooine" },
      },
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} characterId="1" />
      </MemoryRouter>
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
    });
  });

  it("displays loading state correctly", () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      planets: {},
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} characterId="1" />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles unknown homeworld correctly", async () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      planets: {},
      loading: false,
      error: null,
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: "Unknown" }),
      })
    ) as jest.Mock;

    render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} characterId="1" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Unknown")).toBeInTheDocument();
    });
  });

  it("handles fetch error correctly", async () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      planets: {},
      loading: false,
      error: null,
    });

    global.fetch = jest.fn(() => Promise.reject("API is down")) as jest.Mock;

    render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} characterId="1" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).toBeNull();
    });

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
