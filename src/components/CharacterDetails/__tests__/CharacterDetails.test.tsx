import { useCharacterContext } from "../../../context/character-context";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  mockCharacterDetails,
  mockPlanets,
} from "../../../mocks/characterData";
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
      characters: mockCharacterDetails,
      planets: mockPlanets,
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

    const character = mockCharacterDetails;
    const homeworldURL = character[0].homeworld;
    const homeworldName = mockPlanets[homeworldURL].name;

    character.forEach(({ name, gender, hair_color, eye_color, homeworld }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(hair_color)).toBeInTheDocument();
      expect(screen.getByText(eye_color)).toBeInTheDocument();
      expect(screen.getByText(gender)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(homeworldName)).toBeInTheDocument();
    });
  });
});
