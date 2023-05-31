import * as React from 'react';
import { Container, chakra, Stack, Text, Button, Box, Link } from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaGithub } from 'react-icons/fa';

const HeroSection = () => {
    return (
        <Container p={{ base: 8, sm: 14 }} maxW="container-fluid" boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)" mb={8} >
            <Stack direction="column" spacing={6} alignItems="center">
                <Box py={2} px={3} bg="purple.500" w="max-content" color="white" rounded="md" fontSize="sm">
                    <Stack direction={{ base: 'column', sm: 'row' }}>
                        <Text fontWeight="bold">Manage Your Events! 🎉</Text>
                        <Text>Create, Organize, and Enjoy!</Text>
                    </Stack>
                </Box>
                <chakra.h1
                    fontSize={{ base: '4xl', sm: '5xl' }}
                    fontWeight="bold"
                    textAlign="center"
                    maxW="600px"
                >
                    PartyMaster - Your Ultimate Event Manager{' '}
                    <chakra.span color="purple.500" bg="linear-gradient(transparent 50%, #c4b5fd 50%)">
                        Take Control
                    </chakra.span>
                </chakra.h1>
                <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
                    PartyMaster is a comprehensive event management platform that empowers you to create,
                    organize, and manage your events with ease. Whether it's a party, conference, or social
                    gathering, PartyMaster has got you covered.
                </Text>
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    w={{ base: '100%', sm: 'auto' }}
                    spacing={5}
                >
                    <Button
                        colorScheme="purple"
                        variant="outline"
                        rounded="md"
                        size="lg"
                        height="3.5rem"
                        fontSize="1.2rem"
                    >
                        Get Started
                    </Button>
                    <Link
                        href="https://github.com/RaulMaya/PartyMaster"
                        colorScheme="gray"
                        justifyContent="center"
                        textDecoration="none"
                        color="gray.600"
                        _hover={{ color: 'gray.800' }}
                        borderColor="gray.600">


                        <Button
                            leftIcon={<FaGithub />}
                            to="https://github.com/RaulMaya/PartyMaster"
                            colorScheme="gray"
                            variant="outline"
                            rounded="md"
                            size="lg"
                            height="3.5rem"
                            fontSize="1.2rem"
                        >
                            Github
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Container>

    );
};

export default HeroSection;
