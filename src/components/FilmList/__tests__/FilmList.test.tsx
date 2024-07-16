import { render, screen } from "@testing-library/react";
import FilmList from "../FilmList";
import { useCharacterContext } from "../../../context/character-context";

jest.mock("../../../context/character-context", () => ({
  ...jest.requireActual("../../../context/character-context"),
  useCharacterContext: jest.fn(),
}));

describe("FilmList", () => {
  const mockFilms = {
    "https://swapi.dev/api/films/1/": { title: "A New Hope" },
    "https://swapi.dev/api/films/2/": { title: "The Empire Strikes Back" },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders list of film titles correctly", () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      films: mockFilms,
    });

    const filmUrls = [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
    ];

    render(<FilmList filmUrls={filmUrls} />);

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
  });

  it("renders empty list when no films are found", () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      films: {},
    });

    const filmUrls = [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
    ];

    render(<FilmList filmUrls={filmUrls} />);

    expect(screen.queryByText("A New Hope")).not.toBeInTheDocument();
    expect(
      screen.queryByText("The Empire Strikes Back")
    ).not.toBeInTheDocument();
  });

  it("renders empty list when no filmUrls are provided", () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      films: mockFilms,
    });

    const filmUrls: string[] = [];

    render(<FilmList filmUrls={filmUrls} />);

    expect(screen.queryByText("A New Hope")).not.toBeInTheDocument();
    expect(
      screen.queryByText("The Empire Strikes Back")
    ).not.toBeInTheDocument();
  });
});
