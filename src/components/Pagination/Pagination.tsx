import { Box, Button } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = (): (number | string)[] => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage < 5) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage > totalPages - 4) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  return (
    <Box mt={6} display="flex" justifyContent="center" gap={2}>
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        {"<"}
      </Button>
      {generatePageNumbers().map((page, index) =>
        page === "..." ? (
          <Box key={index} px={2} fontSize="lg">...</Box>
        ) : (
          <Button
            key={page}
            onClick={() => typeof page === "number" && onPageChange(page)}
            bg={page === currentPage ? "blue.500" : "gray.200"}
            color={page === currentPage ? "white" : "black"}
            _hover={{ bg: page === currentPage ? "blue.600" : "gray.300" }}
          >
            {page}
          </Button>
        )
      )}
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        {">"}
      </Button>
    </Box>
  );
};

export default Pagination;

