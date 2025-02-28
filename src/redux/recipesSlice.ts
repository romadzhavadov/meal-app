import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecipeById, fetchRecipes, fetchCategories } from "../services/recipes";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strArea?: string;
  strInstructions?: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface RecipesState {
  recipes: Recipe[];
  recipe: Recipe | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  categories: Category[];
  selectedCategory: string;
  currentPage: number;
  recipesPerPage: number;
}

const initialState: RecipesState = {
  recipes: [],
  recipe: null,
  loading: false,
  error: null,
  searchTerm: "",
  categories: [],
  selectedCategory: "All",
  currentPage: 1, 
  recipesPerPage: 9, 
};

// Асинхронний action для отримання рецептів
export const loadRecipes = createAsyncThunk(
  "recipes/load",
  async () => {
  return await fetchRecipes();
  });

// Асинхронний action для отримання одного рецепту
export const fetchRecipe = createAsyncThunk(
  "recipe/fetch",
  async (id: string) => {
  return await fetchRecipeById(id);
  });

// Асинхронний action для отримання категорій
export const loadCategories = createAsyncThunk(
  "categories/load",
  async () => {
  return await fetchCategories();
});


const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Завантаження всіх рецептів
      .addCase(loadRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(loadRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Не вдалося завантажити рецепти";
      })
      // Завантаження одного рецепта
      .addCase(fetchRecipe.pending, (state) => {
        state.loading = true;
         state.error = null;
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;;
      })
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Не вдалося завантажити рецепти";
      })
    
      // Завантаження всіх категорій
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Не вдалося завантажити рецепти";
      })
  },
});

export const { setSearchTerm, setCategory, setCurrentPage } = recipesSlice.actions;
export default recipesSlice.reducer;
