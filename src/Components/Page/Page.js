import React, { useState, useEffect } from "react";
import { useFavoriteCharacters } from "../FavoriteCharacterContext/FavoriteCharacterContext";
import Form from "../Form/Form";
import axios from "axios";
import md5 from "md5";
import CharacterList from "../CharacterList/CharacterList";
import CharacterPage from "../CharacterPage/CharacterPage";
import Loading from "../Load/Loading";
import "./Page.css";

function Page() {
  // const { state: { favoriteCharacters }, addToFavorites } = useFavoriteCharacters();
  const [pageCharacter, setPageCharacter] = useState(false);
  const [initialCharacters, setInitialCharacters] = useState([]);
  const [loadResult, setLoadResult] = useState();
  const [foundCharacter, setFoundCharacter] = useState(null);
  const [characters, setCharacters] = useState([]);
  const { state, addToFavorites } = useFavoriteCharacters();
  const { favoriteCharacters, setFavoriteCharacters } = state;
  const [loading, setLoading] = useState(true);

  const handleAddToFavorites = (character) => {
    // Verifique se o personagem já está na lista de favoritos para evitar duplicatas
    if (
      !favoriteCharacters.find(
        (favCharacter) => favCharacter.id === character.id
      )
    ) {
      // Adicione o personagem à lista de favoritos
      const updatedFavorites = [...favoriteCharacters, character];
      console.log("Before setFavoriteCharacters:", updatedFavorites);
      addToFavorites(updatedFavorites);
      console.log("After setFavoriteCharacters:", updatedFavorites);
    }
  };

  const inputForm = async (enteredCharacter) => {
    try {
      if (!enteredCharacter) {
        setPageCharacter(false);
        // Se o formulário estiver vazio, exiba a lista de personagens
        setFoundCharacter(null);
        setLoadResult(null);
        return;
      }
      const apiKey = "ca5f659c7743cf10d62ffe20bd3b3f4b";
      const privateKey = "d476fbefbedc0c8c15ef716a579dc38e5df27ae9";
      const time = Number(new Date());
      const hash = md5(`${time}${privateKey}${apiKey}`);
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${enteredCharacter}&ts=${time}&apikey=${apiKey}&hash=${hash}`
      );

      const characterData = response.data.data.results[0];

      if (characterData) {
        setFoundCharacter({
          id: characterData.id,
          name: characterData.name,
          thumbnail: {
            path: characterData.thumbnail.path,
            extension: characterData.thumbnail.extension,
          },
          description: characterData.description,
          comics: {
            available: characterData.comics.available,
            items: characterData.comics.items,
          },
          series: {
            available: characterData.series.available,
            items: characterData.series.items,
          },
        });
        setPageCharacter(true);
      } else {
        setFoundCharacter(null);
        setLoadResult(null);
      }
    } catch (error) {
      console.error("Erro ao buscar informações do personagem:", error);
    }
  };
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleCharacterClick = (character) => {
    setPageCharacter(true);
    setLoadResult(
      <CharacterPage
        character={character}
        name={character.name}
        url={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        description={character.description}
        comicsCount={character.comics.available}
        moviesCount={character.series.available}
        lastTenComics={character.stories.items
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10)}
      />
    );

    setFoundCharacter({
      id: character.id,
      name: character.name,
      thumbnail: {
        path: character.thumbnail.path,
        extension: character.thumbnail.extension,
      },
      description: character.description,
      comics: {
        available: character.comics.available,
        items: character.comics.items,
      },
      series: {
        available: character.series.available,
        items: character.series.items,
      },
    });
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const apiKey = "ca5f659c7743cf10d62ffe20bd3b3f4b";
        const privateKey = "d476fbefbedc0c8c15ef716a579dc38e5df27ae9";
        const time = Number(new Date());
        const hash = md5(`${time}${privateKey}${apiKey}`);
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters?ts=${time}&apikey=${apiKey}&hash=${hash}`
        );

        const results = response.data.data.results;

        // Armazenar a resposta inicial
        setInitialCharacters(results);

        // Definir a ordem inicial dos personagens
        const shuffledCharacters = shuffleArray(results);
        setCharacters(shuffledCharacters);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar personagens da Marvel:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="page">
      <Form onInputForm={inputForm} onCharacterClick={pageCharacter} />
      <div className= "page-structure">
        {loading ? <Loading /> : ""}
        {(foundCharacter || loadResult) && (
          <CharacterPage
            name={foundCharacter?.name || ""}
            url={
              foundCharacter
                ? `${foundCharacter.thumbnail.path}.${foundCharacter.thumbnail.extension}`
                : ""
            }
            description={foundCharacter?.description || ""}
            comicsCount={foundCharacter ? foundCharacter.comics.available : 0}
            moviesCount={foundCharacter ? foundCharacter.series.available : 0}
            character={foundCharacter}
            onAddToFavorites={handleAddToFavorites}
            favoriteCharacters={favoriteCharacters}
            setFavoriteCharacters={setFavoriteCharacters}
          />
        )}
        {!foundCharacter && !loadResult && (
          <CharacterList
            characters={characters}
            onCharacterClick={handleCharacterClick}
            onAddToFavorites={handleAddToFavorites}
          />
        )}
      </div>
      <footer></footer>
    </div>
  );
}

export default Page;
