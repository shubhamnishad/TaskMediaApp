
export default function appReducer(state, action) {
    switch (action.type) {
      case "ADD_PHOTO":
        return {
          ...state,
          photos: [...state.photos, action.payload],
        };

      case "REMOVE_PHOTO":
        return {
          ...state,
          photos: state.photos.filter(
            (photo) => photo.id !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };