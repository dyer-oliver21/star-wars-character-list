import { render, screen } from "@testing-library/react";
import FilmList from "../FilmList";
import { useCharacterContext } from "../../../context/character-context";
import { filmUrls, mockFilms } from "../../../mocks/characterData";

jest.mock("../../../context/character-context", () => ({
  ...jest.requireActual("../../../context/character-context"),
  useCharacterContext: jest.fn(),
}));

describe("FilmList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders list of film titles correctly", () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      films: mockFilms,
    });

    render(<FilmList filmUrls={filmUrls} />);

    filmUrls.forEach((url) => {
      expect(screen.getByText(mockFilms[url].title)).toBeInTheDocument();
    });
  });

  it("renders empty list when no films are found", () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      films: {},
    });

    render(<FilmList filmUrls={filmUrls} />);

    filmUrls.forEach((url) => {
      expect(screen.queryByText(mockFilms[url].title)).not.toBeInTheDocument();
    });
  });

  it("renders empty list when no filmUrls are provided", () => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      films: mockFilms,
    });

    const filmUrls: string[] = [];

    render(<FilmList filmUrls={filmUrls} />);

    filmUrls.forEach((url) => {
      expect(screen.queryByText(mockFilms[url].title)).not.toBeInTheDocument();
    });
  });
});
