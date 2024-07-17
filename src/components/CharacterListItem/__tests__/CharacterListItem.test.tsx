import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterListItem from "../CharacterListItem";
import { useCharacterContext } from "../../../context/character-context";
import { mockCharacter, mockPlanets } from "../../../mocks/characterData";

jest.mock("../../../context/character-context", () => ({
  ...jest.requireActual("../../../context/character-context"),
  useCharacterContext: jest.fn(),
}));

describe("CharacterListItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays character details and homeworld correctly", async () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      planets: mockPlanets,
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <CharacterListItem character={mockCharacter} characterId="1" />
      </MemoryRouter>
    );

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(mockPlanets[mockCharacter.homeworld].name)
      ).toBeInTheDocument();
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
