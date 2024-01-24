// FavoriteCharacterContext.js
import React, { createContext, useContext, useReducer } from 'react';

const FavoriteCharactersContext = createContext();

export const useFavoriteCharacters = () => {
  return useContext(FavoriteCharactersContext);
};


let dadosNoLocalStorage = window.localStorage.getItem("marvel-data");

const initialState = {
  favoriteCharacters: dadosNoLocalStorage ? JSON.parse(dadosNoLocalStorage) : [],
};

const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITES':
        window.localStorage.setItem("marvel-data", JSON.stringify(action.payload));
        return {
          ...state,
          favoriteCharacters: action.payload
        };
      // Adicione outros casos conforme necessário
      default:
        return state;
    }
};
export const FavoriteCharactersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const addToFavorites = (character) => {

      const hasCharacter = state.favoriteCharacters.find((char) => char.name === character.name)
      let newFavorites = [...state.favoriteCharacters]

      if(hasCharacter) {
        let index = newFavorites.indexOf(hasCharacter)
        newFavorites.splice(index, 1)
      } else if(state.favoriteCharacters.length < 5) {
        newFavorites = [...state.favoriteCharacters, character]
      } else {
        window.alert("Máximo de 5 favoritos")
      }
  
      dispatch({ type: 'ADD_TO_FAVORITES', payload: newFavorites });
    };
  
    return (
      <FavoriteCharactersContext.Provider value={{ state, addToFavorites }}>
        {children}
      </FavoriteCharactersContext.Provider>
    );
  };
  
