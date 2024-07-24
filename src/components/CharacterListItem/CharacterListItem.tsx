import React from "react";
import { Link } from "react-router-dom";
import CharacterInfoItem from "../CharacterInfoItem/CharacterInfoItem";
import { useCharacterContext } from "../../context/character-context";
import { Character } from "../../types/types";
import useHomeWorld from "../../hooks/useHomeworld";
import "./styles/charact-list-item.css";

interface ICharacterListItemProps {
  character: Character;
  characterId: string;
}

const CharacterListItem: React.FC<ICharacterListItemProps> = ({
  character,
  characterId,
}) => {
  const { planets, loading } = useCharacterContext();
  const homeworld = useHomeWorld(character, planets);

  if (loading || homeworld === null) return <p>Loading...</p>;

  const characterInfo = [
    { label: "Gender", value: character.gender },
    { label: "Home Planet", value: homeworld },
  ];

  return (
    <li
      className="character-list__item character-container"
      data-test-id="character-list-item"
    >
      <Link
        to={`/character/${characterId}`}
        className="character-list-item__link"
      >
        <h2 className="character-list__item-name">{character.name}</h2>
        <section className="flex-between">
          {characterInfo.map((info) => (
            <CharacterInfoItem
              key={info.label}
              label={info.label}
              value={info.value}
            />
          ))}
        </section>
      </Link>
    </li>
  );
};

export default CharacterListItem;
