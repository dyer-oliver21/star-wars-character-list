import React from "react";
import { Link, useParams } from "react-router-dom";
import FilmList from "../FilmList/FilmList";
import CharacterInfoItem from "../CharacterInfoItem/CharacterInfoItem";
import { useCharacterContext } from "../../context/character-context";
import { Character } from "../../types/types";
import useHomeWorld from "../../hooks/useHomeworld";
import "./styles/character-details.css";

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { characters, planets, loading, error } = useCharacterContext();

  const character: Character | undefined = characters?.find(
    (_, index) => index + 1 === Number(id)
  );

  const homeworld = useHomeWorld(character, planets);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!character) return <p>Character not found</p>;
  if (homeworld === null) return <p>Loading home planet...</p>;

  const characterInfo = [
    { label: "Hair Colour", value: character.hair_color },
    { label: "Eye Colour", value: character.eye_color },
    { label: "Gender", value: character.gender },
    { label: "Home Planet", value: homeworld },
  ];

  return (
    <section className="character-details container">
      <Link
        to="/"
        className="button button-secondary"
        data-test-id="character-details-back-button"
      >
        Back
      </Link>
      <article className="character-container character-details__container grid  two-col-grid one-col-grid--mobile">
        <h1
          className="character-details__name text-center"
          data-test-id="character-details-name"
        >
          {character?.name}
        </h1>
        <section className="container container-small">
          <article className="character-details__info">
            <ul className="character-details__list grid two-col-grid one-col-grid--mobile">
              {characterInfo.map((info) => (
                <li key={info.label} className="character-details__list--item">
                  <CharacterInfoItem label={info.label} value={info.value} />
                </li>
              ))}
            </ul>
          </article>
          <aside className="character-details__films">
            <h2 className="heading__small">Films</h2>
            <div className="character-details__films-list-container">
              {character?.films && <FilmList filmUrls={character.films} />}
            </div>
          </aside>
        </section>
      </article>
    </section>
  );
};

export default CharacterDetails;
