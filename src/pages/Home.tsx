import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadCategories, loadRecipes, setCategory, setCurrentPage } from "../redux/recipesSlice";
import { Box, Image, Text, Grid, Spinner, Center, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { searchTerm, recipes, categories, selectedCategory, loading, error, currentPage, recipesPerPage } = useAppSelector((state) => state.recipes);
  
  const { favorites } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(loadRecipes());
    dispatch(loadCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [selectedCategory, dispatch]);

  const filteredRecipes = recipes.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || meal.strCategory === selectedCategory)
  );

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="80vh">
        <Spinner size="xl" />
      </Box>
    );

  if (error)
    return (
      <Box textAlign="center" color="red.500" mt={10}>
        <Text fontSize="xl">Помилка: {error}</Text>
      </Box>
    );

  return (
    <Box mt="100px" p={6}>
      {/* Фільтр по категорії */}
      <Box mb={4} maxW="300px">
        <select
          value={selectedCategory}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "white",
            fontSize: "16px",
          }}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.idCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>
      </Box>

      {/* Перевірка наявності рецептів */}
      {filteredRecipes.length === 0 && !loading ? (
        <Center minH="50vh">
          <Text fontSize="xl" color="red.500" fontWeight="bold">
            Sorry, Nothing found.
          </Text>
        </Center>
      ) : (
        <>
          <Grid
            templateColumns={`repeat(auto-fit, minmax(${filteredRecipes.length === 1 ? "200px" : "200px"}, 1fr))`}
            gap={4}
            width="100%"
            justifyContent="center"
          >
            {currentRecipes.map((meal) => {
              const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);
              return (
                <Box
                  key={meal.idMeal}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  maxW={filteredRecipes.length === 1 ? "350px" : "100%"}
                  mx="auto"
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <Link to={`/recipe/${meal.idMeal}`}>
                    <Image src={meal.strMealThumb} alt={meal.strMeal} borderRadius="md" />
                    <Text fontSize="lg" fontWeight="bold">{meal.strMeal}</Text>
                    <Text color="gray.500">{meal.strCategory}</Text>
                  </Link>
                  <Button
                    mt={2}
                    colorScheme={isFavorite ? "red" : "green"}
                    onClick={() => dispatch(isFavorite ? removeFavorite(meal.idMeal) : addFavorite(meal))}
                  >
                    {isFavorite ? "Видалити з вибраних" : "Додати у вибрані"}
                  </Button>
                </Box>
              );
            })}
          </Grid>

          {/* Пагінація */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => dispatch(setCurrentPage(page))}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Home;

