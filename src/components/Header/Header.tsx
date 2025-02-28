import { Box, Flex, Input, Spacer } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSearchTerm } from "../../redux/recipesSlice";
import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

const Header = () => {
  const dispatch = useAppDispatch();
  const globalSearchTerm = useAppSelector((state) => state.recipes.searchTerm);

  // Локальний стан для введеного значення
  const [localSearch, setLocalSearch] = useState(globalSearchTerm);

  // Дебаунс функція з useCallback
  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      dispatch(setSearchTerm(searchValue));
    }, 500),
    [dispatch]
  );

  // Викликаємо дебаунс при зміні локального пошуку
  useEffect(() => {
    debouncedSearch(localSearch);
    return () => {
      debouncedSearch.cancel(); // Очищення debounce при анмаунті або зміні залежностей
    };
  }, [localSearch, debouncedSearch]);

  return (
    <Box
      as="header"
      bg="blue.500"
      color="white"
      py={4}
      px={6}
      shadow="md"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="1000"
    >
      <Flex align="center" maxW="1200px" mx="auto">
        {/* Логотип */}
        <NavLink
          to="/"
          style={{ textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold", color: "white" }}
        >
          MealApp
        </NavLink>

        <Spacer />

        {/* Поле пошуку */}
        <Input
          placeholder="Пошук рецепту..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          size="md"
          width="300px"
          borderRadius="md"
          bg="white"
          color="black"
        />

        <Spacer />

        {/* Навігація */}
        <Flex gap={6}>
          <NavLink to="/" style={{ textDecoration: "none", fontWeight: "bold", color: "white" }}>
            Home
          </NavLink>
          <NavLink to="/favorites" style={{ textDecoration: "none", fontWeight: "bold", color: "white" }}>
            Favorites
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

