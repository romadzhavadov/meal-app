import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Image, Text, Spinner, VStack, Heading } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchRecipe } from "../redux/recipesSlice";

const Recipe = () => {
  const { id } = useParams();
 
  const { recipe, loading, error } = useAppSelector((state) => state.recipes);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchRecipe(id))
  }, [dispatch, id]);


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
  
if (!recipe)
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="80vh"
      textAlign="center"
      color="red"
    >
      <Text fontSize="xl" fontWeight="bold" color="red.500">
        Recipe not found
      </Text>
    </Box>
  );

  return (
    <Box mt="70px" p={6} maxW="800px" mx="auto">
      <Heading as="h2" mb={4}>
        {recipe.strMeal}
      </Heading>
      <Image src={recipe.strMealThumb} alt={recipe.strMeal} borderRadius="md" />
      <VStack align="start" mt={4} spacing={3}>
        <Text fontWeight="bold">Category: {recipe.strCategory}</Text>
        <Text fontWeight="bold">Area: {recipe.strArea}</Text>
        <Text mt={2}>{recipe.strInstructions}</Text>
      </VStack>
    </Box>
  );
};

export default Recipe;
