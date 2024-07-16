import React from "react";
import { Character } from "../../types/types";
import CharacterListItem from "../CharacterListItem/CharacterListItem";
import { useCharacterContext } from "../../context/character-context";
import { getIdFromUrl } from "../../utils/utils";

const CharacterList: React.FC = () => {
  const { characters, loading, error } = useCharacterContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1 className="text-center" data-test-id="character-list-main-heading">
        Character List
      </h1>
      <section className="character-list__container">
        <ul className="grid two-col-grid one-col-grid--mobile">
          {characters?.map((character: Character) => {
            const characterId = getIdFromUrl(character.url);
            return (
              <CharacterListItem
                key={characterId}
                character={character}
                characterId={characterId}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default CharacterList;
