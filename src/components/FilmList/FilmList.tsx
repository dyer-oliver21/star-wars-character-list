import React, { useEffect, useState } from "react";
import { useCharacterContext } from "../../context/character-context";
import "./styles/films-list.css";

interface FilmListProps {
  filmUrls: string[];
}

const FilmList: React.FC<FilmListProps> = ({ filmUrls }) => {
  const { films } = useCharacterContext();
  const [characterFilmList, setCharacterFilmList] = useState<string[]>([]);

  useEffect(() => {
    if (films) {
      const filmTitles: string[] = filmUrls.map(
        (url) => films[url]?.title || ""
      );
      setCharacterFilmList(filmTitles);
    }
  }, [filmUrls, films]);

  return (
    <ul className="films-list" data-test-id="film-list">
      {characterFilmList.map((title: string, index: number) => (
        <li
          key={index}
          className="films-list-item"
          data-test-id="films-list-item"
        >
          {title}
        </li>
      ))}
    </ul>
  );
};

export default FilmList;
