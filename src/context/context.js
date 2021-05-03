import React, { createContext, useReducer } from 'react';
import appReducer from './appReducer';
const initialState = {
  photos: [
   
  ]
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addPhoto(picture) {
    const photo={...picture,id: state.photos.length};
    console.log("indexxxxxxx##############",state.photos.length );
    dispatch({
      type: "ADD_PHOTO",
      payload: photo,
    });
  }

 
  function removePhoto(id) {
    dispatch({
      type: "REMOVE_PHOTO",
      payload: id
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        photos: state.photos,
        addPhoto,
        removePhoto
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};