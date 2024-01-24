import React, { useState, useEffect } from 'react';
import {useFavoriteCharacters} from '../FavoriteCharacterContext/FavoriteCharacterContext';
import Form from "../Form/Form";
import axios from 'axios';
import md5 from 'md5';
import CharacterList from '../CharacterList/CharacterList';
import CharacterPage from '../CharacterPage/CharacterPage';
import Loading from '../Load/Loading';
import "./Page.css";


function Page() {
    // const { state: { favoriteCharacters }, addToFavorites } = useFavoriteCharacters();
    const [pageCharacter, setPageCharacter] = useState(false)
    const [initialCharacters, setInitialCharacters] = useState([]);
    const [loadResult, setLoadResult] = useState();
    const [disableDestak, setDisableDestak] = useState();
    const [addLoading, setAddLoading] = useState(true);
    const [foundCharacter, setFoundCharacter] = useState(null);
    const [characters, setCharacters] = useState([]);
    const {state, addToFavorites } = useFavoriteCharacters();
    const { favoriteCharacters, setFavoriteCharacters } = state;
    const [loading, setLoading] = useState(true);


    const handleAddToFavorites = (character) => {
    // Verifique se o personagem já está na lista de favoritos para evitar duplicatas
        if (!favoriteCharacters.find((favCharacter) => favCharacter.id === character.id)) {
            // Adicione o personagem à lista de favoritos
            const updatedFavorites = [...favoriteCharacters, character];
            console.log('Before setFavoriteCharacters:', updatedFavorites);
            addToFavorites(updatedFavorites);
            console.log('After setFavoriteCharacters:', updatedFavorites);
        }
    };

    const inputForm = async (enteredCharacter) => {
        try {
            if (!enteredCharacter) {
                // Se o formulário estiver vazio, exiba a lista de personagens
                setFoundCharacter(null);
                setLoadResult(null);
                return;
            }
            const apiKey = 'ab003d2725d2c2fa3f4fe5423ff2df22';
            const privateKey = '9c164aaa05226aa7297f401a298db0c93f4aef98';
            const time = Number(new Date());
            const hash = md5(`${time}${privateKey}${apiKey}`);
            const response = await axios.get(
                `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${enteredCharacter}&ts=${time}&apikey=${apiKey}&hash=${hash}`
            );

            const characterData = response.data.data.results[0];
            

            if (characterData ) {
                setFoundCharacter({
                    id: characterData.id,
                    name: characterData.name,
                    thumbnail: {
                        path: characterData.thumbnail.path,
                        extension: characterData.thumbnail.extension
                    },
                    description: characterData.description,
                    comics: {
                        available: characterData.comics.available,
                        items: characterData.comics.items
                    },
                    series: {
                        available: characterData.series.available,
                        items: characterData.series.items
                    },
                    // Add other properties as needed
                });
                setPageCharacter(false)
            } else {
                setFoundCharacter(null);
                setLoadResult(null);

            }
        } catch (error) {
            console.error('Erro ao buscar informações do personagem:', error);
        }
        setPageCharacter(false)
    };
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
        };

    const handleCharacterClick = (character) => {
        setLoadResult(
            <CharacterPage
                character={character}
                name={character.name}
                url={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                description={character.description}
                comicsCount={character.comics.available}
                moviesCount={character.series.available}
                lastTenComics={character.stories.items.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)}
            />
        );

        setFoundCharacter({
            id: character.id,
            name: character.name,
            thumbnail: {
                path: character.thumbnail.path,
                extension: character.thumbnail.extension
            },
            description: character.description,
            comics: {
                available: character.comics.available,
                items: character.comics.items
            },
            series: {
                available: character.series.available,
                items: character.series.items
            },
            // Add other properties as needed
        });
        setPageCharacter(true);
    };

    useEffect(() => {
        // Simular uma operação assíncrona
        const fetchData = async () => {
          await new Promise(resolve => setTimeout(resolve, 10000));
          setLoading(false);
        };
    
        fetchData();
        setLoading(true)
    }, []);
    useEffect(() => {
      const fetchCharacters = async () => {
        try {
            const apiKey = 'ab003d2725d2c2fa3f4fe5423ff2df22';
            const privateKey = '9c164aaa05226aa7297f401a298db0c93f4aef98';
            const time = Number(new Date());
            const hash = md5(`${time}${privateKey}${apiKey}`);
            const response = await axios.get(
                `https://gateway.marvel.com/v1/public/characters?ts=${time}&apikey=${apiKey}&hash=${hash}`
            );
    
            const results = response.data.data.results;
    
            // Armazenar a resposta inicial
            setInitialCharacters(results);
    
            // Definir a ordem inicial dos personagens
            // setCharacters(results);
            const shuffledCharacters = shuffleArray(results);
            setCharacters(shuffledCharacters);
        } catch (error) {
            console.error('Erro ao buscar personagens da Marvel:', error);
        }
      };
  
      fetchCharacters();
    }, []);

    return (
        <div className="page" >
            <Form onInputForm={inputForm} onCharacterClick={pageCharacter}  />
            <div className={`page-structure ${disableDestak ? "" : "disable-destak"} ${addLoading ? "page-add-loading" : ""} `}>
                {loading ? <Loading/> : ''}
                {(foundCharacter || loadResult) && (
                    <CharacterPage
                    name={foundCharacter?.name || ""}
                    url={foundCharacter ? `${foundCharacter.thumbnail.path}.${foundCharacter.thumbnail.extension}` : ""}
                    description={foundCharacter?.description || ""}
                    comicsCount={foundCharacter ? foundCharacter.comics.available : 0}
                    moviesCount={foundCharacter ? foundCharacter.series.available : 0}
                    lastTenComics={foundCharacter && foundCharacter.stories && foundCharacter.stories.items ?
                        foundCharacter.stories.items.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10) :
                        []
                    }
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
            
        </div>
    );

}


export default Page;
