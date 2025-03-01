import { Box, Grid, Image, Text, Button, VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeFavorite } from "../redux/favoritesSlice";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);

  // Формуємо список унікальних інгредієнтів
  const ingredientsMap = new Map();
  favorites.forEach((meal) => {
    for (let i = 1; i <= 20; i++) {
      // @ts-ignore
      const ingredient = meal[`strIngredient${i}`];
      // @ts-ignore
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        const key = ingredient.toLowerCase();
        if (ingredientsMap.has(key)) {
          ingredientsMap.set(key, `${ingredientsMap.get(key)}, ${measure}`);
        } else {
          ingredientsMap.set(key, measure);
        }
      }
    }
  });

  return (
    <Box mt="100px" p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Favorite Recipes</Text>
      {favorites.length === 0 ? (
        <Text fontSize="lg" color="gray.500">No favorite recipes yet.</Text>
      ) : (
        <>
          <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
            {favorites.map((meal) => (
              <Box key={meal.idMeal} borderWidth="1px" borderRadius="lg" p={4}>
                <Image src={meal.strMealThumb} alt={meal.strMeal} borderRadius="md" />
                <Text fontSize="lg" fontWeight="bold">{meal.strMeal}</Text>
                <Text color="gray.500">{meal.strCategory}</Text>
                <Button mt={2} colorScheme="red" size="sm" onClick={() => dispatch(removeFavorite(meal.idMeal))}>
                  Remove
                </Button>
              </Box>
            ))}
          </Grid>

          <Box mt={6}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>Ingredients List</Text>
            <VStack align="start" gap={1}>
              {[...ingredientsMap.entries()].map(([ingredient, measure]) => (
                <Text key={ingredient}>{ingredient}: {measure}</Text>
              ))}
            </VStack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Favorites;

