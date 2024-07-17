import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterList from "../CharacterList";
import { useCharacterContext } from "../../../context/character-context";
import { mockCharacters } from "../../../mocks/characterData";

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

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });
});
