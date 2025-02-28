import { api } from "./api";

export const fetchRecipes = async () => {
  const response = await api.get("/search.php?s=");
  return response.data.meals || [];
};

export const fetchRecipeById = async (id: string) => {
  const response = await api.get(`/lookup.php?i=${id}`);
  return response.data.meals ? response.data.meals[0] : null;
};

export const fetchCategories = async () => {
  const response = await api.get(`/categories.php`);
  return response.data.categories || [];
};

