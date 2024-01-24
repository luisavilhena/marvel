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

}) {
  const apiKey = 'ca5f659c7743cf10d62ffe20bd3b3f4b';
  const privateKey = 'd476fbefbedc0c8c15ef716a579dc38e5df27ae9';
  const time = Number(new Date());
  const hash = md5(`${time}${privateKey}${apiKey}`);
  
  const [comicDetails, setComicDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [releases, setReleases] = useState([])
  const lastLictComic = character.comics.items
  ///adidiconar as últimas 10 histórias com nome e imagem de cada personagem

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

  useEffect(() => {
    let releaseList = []
    character.comics.items.map(async (comic, index) => {
      if (index > 9) return;
      const response = await axios.get(
        `${comic.resourceURI}?&apikey=${apiKey}&hash=${hash}&ts=${time}`
      );
      if(response.statusText === 'OK') {
        releaseList.push({
          name: response.data.data.results[0].title,
          thumbnail: response.data.data.results[0].thumbnail.path + '/portrait_medium.' + response.data.data.results[0].thumbnail.extension
        })
        setReleases([...releaseList])
      }
    })
  }, [])

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
          <img src={url} alt={name} onLoad={()=>{ setLoading(false) }} />
        </div>
      </div>
      <h3>Últimos Lançamentos</h3>
      <ul className="comics-list">
      {releases.map((comic, index) => (
          <li key={index}>
            <img src={comic.thumbnail} alt={comic.name} />
            <h3>{comic.name}</h3>
          </li>
        ))}
      </ul>

      </div>

    </div>
  );
}

export default CharacterPage;
