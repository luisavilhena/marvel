import React, { useState } from "react";
import "./CharacterList.css";
import { useFavoriteCharacters } from "../FavoriteCharacterContext/FavoriteCharacterContext";
import heart from "../../assets/icones/heart/heart.png";
import heartComplete from "../../assets/icones/heart/heartcomplete.png";
import hero from "../../assets/icones/heroi/hero.png";
import toggle from "../../assets/toggle/toggle.png";
import toggleS from "../../assets/toggle/toggle-2.png";

function CharacterList({ characters, onCharacterClick }) {
  const { state, addToFavorites } = useFavoriteCharacters();
  const { favoriteCharacters } = state;
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const isCharacterFavorited = (character) => {
    return favoriteCharacters.some(
      (favCharacter) => favCharacter.name === character.name
    );
  };

  const handleAddToFavorites = (character) => {
    addToFavorites(character);
  };

  const sortedCharacters = isToggled
    ? characters.slice().sort((a, b) => a.name.localeCompare(b.name))
    : characters;

  const filteredCharacters = showOnlyFavorites
    ? favoriteCharacters
    : sortedCharacters;

  return (
    <div className="structure">
      <div className="character-header">
        <div>
          <h3>Encontrados {characters.length} heróis</h3>
        </div>
        <div className="character-header__menu">
          <div>
            <img src={hero} alt="Ordenar por nome - A/Z"></img>
            Ordenar por nome - A/Z
            <div onClick={handleToggle}>
              <img
                className="toggle-switch"
                src={isToggled ? toggleS : toggle}
                alt="Toggle Switch"
              />
            </div>
          </div>
          <a className="menu-favoritos" onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}>
            {!showOnlyFavorites ? <div className="favoritos"><img src={heartComplete} alt="like"></img>Somente os favoritos</div>
             : 'todos os super heróis'}
          </a>
        </div>
      </div>
      <ul className="character-list">
        {filteredCharacters.map((character, index) => (
          <li key={index}>
            <a onClick={() => onCharacterClick(character)}>
              <img
                className="character-list__img"
                src={
                  character.thumbnail.path +
                  "/standard_fantastic." +
                  character.thumbnail.extension
                }
                alt={character.name}
              ></img>
            </a>
            <div>
              <h3>{character.name}</h3>
              <a
                className="character-list__like"
                onClick={() => handleAddToFavorites(character)}
              >
                <img
                  src={isCharacterFavorited(character) ? heartComplete : heart}
                  alt="like"
                />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterList;
