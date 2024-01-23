// FavoriteCharacterContext.js
import React, { createContext, useContext, useReducer } from 'react';

const FavoriteCharactersContext = createContext();

export const useFavoriteCharacters = () => {
  return useContext(FavoriteCharactersContext);
};

const initialState = {
  favoriteCharacters: [],
};

const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_FAVORITES':
        return {
          ...state,
          favoriteCharacters: Array.isArray(action.payload)
            ? [...state.favoriteCharacters, ...action.payload]
            : [...state.favoriteCharacters, action.payload],
        };
      // Adicione outros casos conforme necessário
      default:
        return state;
    }
};
export const FavoriteCharactersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    const addToFavorites = (characters) => {
      const uniqueCharacters = characters.filter((character) => {
        console.log('o personagem está na lista')
        return !state.favoriteCharacters.some((favCharacter) => favCharacter.id === character.id);
      });
  
      dispatch({ type: 'ADD_TO_FAVORITES', payload: uniqueCharacters });
    };
  
    return (
      <FavoriteCharactersContext.Provider value={{ state, addToFavorites }}>
        {children}
      </FavoriteCharactersContext.Provider>
    );
  };
  
