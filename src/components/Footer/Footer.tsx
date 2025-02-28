import { Box, Text, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="blue.500" color="white" py={3} px={6} textAlign="center" mt="auto">
      <Flex justify="center">
        <Text fontSize="sm">© {new Date().getFullYear()} MealApp. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;

