import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strArea?: string;
  strInstructions?: string;
}

interface FavoritesState {
  favorites: Recipe[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Recipe>) => {
      const exists = state.favorites.some((recipe) => recipe.idMeal === action.payload.idMeal);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((recipe) => recipe.idMeal !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
