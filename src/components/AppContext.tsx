import React, { createContext, useReducer } from 'react';

const initialState = {
  posts: [],
  selectedCategory: null,
};

export const AppContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [...state.posts, action.payload] };
      case 'UPDATE_POST':
        return {
          ...state,
          posts: state.posts.map(post =>
            post.id === action.payload.id ? { ...post, ...action.payload } : post
          ),
      };
      
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
