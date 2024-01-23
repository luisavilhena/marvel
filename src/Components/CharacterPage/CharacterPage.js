import React from 'react';
import { useFavoriteCharacters } from '../FavoriteCharacterContext/FavoriteCharacterContext';
import axios from 'axios';
import md5 from 'md5';
import heart from "../../assets/icones/heart/heart.png"
import heartComplete from "../../assets/icones/heart/heartcomplete.png"
import book from "../../assets/icones/book/book.png"
import video from "../../assets/icones/video/video.png"
import review from "../../assets/review/review.png"
import "./CharacterPage.css"

function CharacterPage({ name, url, description, comicsCount, moviesCount, lastTenComics }) {
  const { state: { favoriteCharacters }, addToFavorites } = useFavoriteCharacters();

  const isCharacterFavorited = favoriteCharacters.some((favCharacter) => console.log("qual o nome",favCharacter.name));

  const handleAddToFavorites = () => {
    // Verifica se o personagem já está na lista de favoritos
    // const isCharacterAlreadyFavorited = favoriteCharacters.some((favCharacter) => console.log(favCharacter.name));

    // if (!isCharacterAlreadyFavorited) {
      const characterData = {
        name,
        thumbnail: { path: 'path', extension: 'extension' },
      };

      if (isCharacterFavorited) {
        // Se já foi favoritado, remove da lista de favoritos
        const updatedFavorites = favoriteCharacters.filter((favCharacter) => favCharacter.name !== name);
        addToFavorites(updatedFavorites);
      } else {
        // Se não foi favoritado, adiciona à lista de favoritos
        addToFavorites([...favoriteCharacters, characterData]);
      }
    // }
  };

  let lastComicDate = null;

  if (lastTenComics.length > 0) {
    const firstComic = lastTenComics[0];

    if (firstComic.dates) {
      const onSaleDate = firstComic.dates.find(date => date.type === 'onsaleDate');

      if (onSaleDate) {
        lastComicDate = onSaleDate.date;
      }
    }
  }

  return (
    <div className="character-page">
      <div className='character-page__columns'>
        <div>
          <div className="name">
            <h2>{name}</h2>
            <a onClick={handleAddToFavorites}>
              <img src={isCharacterFavorited ? heartComplete : heart} alt="like" />
            </a>
          </div>
          <p>{description}</p>
          <div className="infos">
            <div className='infos__comic-movies'>
              <div>
                <h4>Quadrinhos</h4>
                <div className='comic-movies'>
                  <img src={book} alt="book" />
                  <p>{comicsCount}</p>
                </div>
              </div>
              <div>
                <h4>Filmes</h4>
                <div className='comic-movies'>
                  <img src={video} alt="video" />
                  <p>{moviesCount}</p>
                </div>
              </div>
            </div>
            <div className='raiting'>
              <h4>Rating:</h4>
              <img src={review} alt="review" />
            </div>
            <div className='last-comic'>
              <h4>Último quadrinho:</h4>
              13 fev. 2020
            </div>
          </div>
        </div>
        <div>
          <img src={url} alt={name} />
        </div>
      </div>
      <h3>Últimos Lançamentos</h3>
      <ul>
        {lastTenComics.map((comic, index) => (
          <li key={index}>
            {console.log(comic)}
            <img src={comic.url} alt={comic.name} />
            {comic.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterPage;
