import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const NotFoundPage = () => {
    return (
        <Box textAlign="center" py={20}>
            <Heading
                as="h2"
                size="4xl"
                bgGradient="linear(to-r, purple.400, purple.600)"
                backgroundClip="text"
            >
                404
            </Heading>
            <Text fontSize="xl" mt={6} mb={4}>
                Page Not Found
            </Text>
            <Text color="gray.500" fontSize="lg" mb={10}>
                The page you're looking for does not seem to exist.
            </Text>

            <Link to="/">
                <Button
                    colorScheme="purple"
                    bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
                    color="white"
                    variant="solid"
                    size="lg"
                >
                    Go to Home
                </Button>
            </Link>
        </Box>
    );
};

export default NotFoundPage;