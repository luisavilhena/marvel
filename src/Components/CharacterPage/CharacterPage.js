import React, { useState, useEffect } from "react";
import { useFavoriteCharacters } from "../FavoriteCharacterContext/FavoriteCharacterContext";
import axios from "axios";
import md5 from "md5";
import heart from "../../assets/icones/heart/heart.png";
import heartComplete from "../../assets/icones/heart/heartcomplete.png";
import book from "../../assets/icones/book/book.png";
import video from "../../assets/icones/video/video.png";
import review from "../../assets/review/review.png";
import Loading from "../Load/Loading";
import "./CharacterPage.css";

function CharacterPage({
  character,
  name,
  url,
  id,
  description,
  comicsCount,
  moviesCount,
  lastTenComics,

}) {
  const apiKey = 'ab003d2725d2c2fa3f4fe5423ff2df22';
  const privateKey = '9c164aaa05226aa7297f401a298db0c93f4aef98';
  const time = Number(new Date());
  const hash = md5(`${time}${privateKey}${apiKey}`);

  const [comicDetails, setComicDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastLictComic = character.comics.items
  ///adidiconar as últimas 10 histórias com nome e imagem de cada personagem
  // useEffect(() => {
  //       console.log(character.id, 'iddd')
  //       const responseList = axios.get(`https://gateway.marvel.com/v1/public/comics/${character.id}?ts=${time}&apikey=${apiKey}&hash=${hash}`);
  //       console.log('newcomicList',responseList.comics)
  //       return responseList.data; // Ajuste conforme a estrutura real da resposta  

  // }, [apiKey, time, hash]);

  useEffect(() => {
    // Simular uma operação assíncrona
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 8000));
      setLoading(false);
    };

    fetchData();
  }, []);
  const {
    state: { favoriteCharacters },
    addToFavorites,
  } = useFavoriteCharacters();

  const isCharacterFavorited = (char) => {
    return favoriteCharacters.find(
      (favCharacter) => favCharacter.name === char.name
    );
  };

  const handleAddToFavorites = () => {
    addToFavorites(character);
  };

  let lastComicDate = null;

  // if (lastTenComics.length > 0) {
  //   const firstComic = lastTenComics[0];

  //   if (firstComic.dates) {
  //     const onSaleDate = firstComic.dates.find(
  //       (date) => date.type === "onsaleDate"
  //     );

  //     if (onSaleDate) {
  //       lastComicDate = onSaleDate.date;
  //     }
  //   }
  // }

  return (
    <div className="character-page">
      {loading ? <Loading/>:''}
      <div className="structure">
      <div className="character-page__columns">
        <div>
          <div className="name">
            <h2>{name}</h2>
            <a onClick={handleAddToFavorites}>
              <img
                src={isCharacterFavorited(character) ? heartComplete : heart}
                alt="like"
              />
            </a>
          </div>
          <p>{description}</p>
          <div className="infos">
            <div className="infos__comic-movies">
              <div>
                <h4>Quadrinhos</h4>
                <div className="comic-movies">
                  <img src={book} alt="book" />
                  <p>{comicsCount}</p>
                </div>
              </div>
              <div>
                <h4>Filmes</h4>
                <div className="comic-movies">
                  <img src={video} alt="video" />
                  <p>{moviesCount}</p>
                </div>
              </div>
            </div>
            <div className="raiting">
              <h4>Rating:</h4>
              <img src={review} alt="review" />
            </div>
            <div className="last-comic">
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
      {lastLictComic.map((comic, index) => (
          <li key={index}>
            <img alt={comic.name} />
            {comic.name}
          </li>
        ))}
      </ul>

      </div>

    </div>
  );
}

export default CharacterPage;
