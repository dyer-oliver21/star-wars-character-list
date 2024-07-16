import { useCharacterContext } from "../../../context/character-context";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterDetails from "../CharacterDetails";

jest.mock("../../../context/character-context", () => ({
  ...jest.requireActual("../../../context/character-context"),
  useCharacterContext: jest.fn(),
}));

describe("CharacterDetails", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading message", () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      characters: [],
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
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
          <Route path="/" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Error: Failed to fetch characters")
    ).toBeInTheDocument();
  });

  it("displays character details", async () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      characters: [
        {
          name: "Luke Skywalker",
          gender: "male",
          hair_color: "blond",
          eye_color: "blue",
          homeworld: "https://swapi.dev/api/planets/1/",
          films: ["https://swapi.dev/api/films/1/"],
        },
      ],
      planets: {
        "https://swapi.dev/api/planets/1/": {
          name: "Tatooine",
        },
      },
      loading: false,
      error: null,
    });
    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("blond")).toBeInTheDocument();
    expect(screen.getByText("blue")).toBeInTheDocument();
    expect(screen.getByText("male")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
    });
  });
});
