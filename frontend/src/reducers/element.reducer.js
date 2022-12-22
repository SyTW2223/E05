import {
    CREATE_ELEMENT,
    RETRIEVE_ELEMENTS,
    UPDATE_ELEMENT,
    DELETE_ELEMENT,
    DELETE_ALL_ELEMENTS,
  } from "../types";
  
  const initialState = [];
  
  function elementReducer(elements = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_ELEMENT:
        return [...elements, payload];
  
      case RETRIEVE_ELEMENTS:
        return payload;
  
      case UPDATE_ELEMENT:
        return elements.map((element) => {
          if (element.id === payload.id) {
            return {
              ...element,
              ...payload,
            };
          } else {
            return element;
          }
        });
  
      case DELETE_ELEMENT:
        return elements.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_ELEMENTS:
        return [];
  
      default:
        return elements;
    }
  };
  
  export default elementReducer;