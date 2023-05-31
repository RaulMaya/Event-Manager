import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
    IconButton,
    Collapse,
    useBreakpointValue,
} from '@chakra-ui/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

import Auth from '../utils/auth';

const NavBar = () => {
    const isDesktop = useBreakpointValue({ base: false, lg: true });
    const [show, setShow] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleMenuClose = () => {
        setIsExpanded(false);
    };

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const isLoggedIn = Auth.loggedIn();

    useEffect(() => {
        setShow(isDesktop && isExpanded);
    }, [isDesktop, isExpanded]);

    return (
        <Box as="nav" bg="purple.500" color="white" px={{ base: 2, md: 4 }} py={2}>
            <Container maxW="container.maxW" py={{ base: '4', lg: '5' }}>
                <HStack spacing="10" justify="space-between" align="center" width="full">
                    <Flex align="center">
                        <RouterLink to="/" mr={2} color="white">
                            <Box fontSize="2xl" fontWeight="extrabold" _hover={{ color: 'whiteAlpha.800' }} letterSpacing="wide" textTransform="uppercase">
                                PartyMaster
                            </Box>
                        </RouterLink>
                    </Flex>
                    {isDesktop ? (
                        <Flex justify="space-between" flex="1">
                            <ButtonGroup variant="link" spacing="8">
                                <RouterLink to="/events">
                                    <Button size="lg" colorScheme="purple" variant="solid" m={2}>
                                        Events
                                    </Button>
                                </RouterLink>
                                {isLoggedIn && (
                                    <>
                                        <RouterLink to="/createEvent">
                                            <Button size="lg" colorScheme="purple" variant="solid" m={2}>
                                                Create Event
                                            </Button>
                                        </RouterLink>
                                        <RouterLink to="/userProfile">
                                            <Button size="lg" colorScheme="purple" variant="solid" m={2}>
                                                User Profile
                                            </Button>
                                        </RouterLink>
                                    </>
                                )}
                            </ButtonGroup>
                            <HStack spacing="3">
                                {isLoggedIn ? (
                                    <Button variant="outline" m={2} onClick={logout}>
                                        Logout
                                    </Button>
                                ) : (
                                    <>
                                        <RouterLink to="/login">
                                            <Button size="lg" colorScheme="purple" variant="solid" m={2}>
                                                Login
                                            </Button>
                                        </RouterLink>
                                        <RouterLink to="/signup">
                                            <Button size="lg" variant="outline" m={2}>
                                                Signup
                                            </Button>
                                        </RouterLink>
                                    </>
                                )}
                            </HStack>
                        </Flex>
                    ) : (
                        <IconButton
                            variant="ghost"
                            icon={isExpanded ? <FiX fontSize="1.25rem" /> : <FiMenu fontSize="1.25rem" />}
                            aria-label="Open Menu"
                            onClick={handleToggle}
                        />
                    )}
                </HStack>
                {isDesktop ? null : (
                    <Collapse in={isExpanded} unmountOnExit>
                        <Box py={2}>
                            <Flex direction="column">
                                <RouterLink to="/events" onClick={handleMenuClose}>
                                    <Button size="lg" colorScheme="purple" variant="solid" m={2} w="full">
                                        Events
                                    </Button>
                                </RouterLink>
                                <RouterLink to="/createEvent" onClick={handleMenuClose}>
                                    <Button size="lg" colorScheme="purple" variant="solid" m={2} w="full">
                                        Create Event
                                    </Button>
                                </RouterLink>
                                <RouterLink to="/userProfile" onClick={handleMenuClose}>
                                    <Button size="lg" colorScheme="purple" variant="solid" m={2} w="full">
                                        User Profile
                                    </Button>
                                </RouterLink>
                                {isLoggedIn ? (
                                    <RouterLink to="/">
                                        <Button variant="outline" m={2} w="full" onClick={logout}>
                                            Logout
                                        </Button>
                                    </RouterLink>
                                ) : (
                                    <>
                                        <RouterLink to="/login" onClick={handleMenuClose}>
                                            <Button size="lg" colorScheme="purple" variant="solid" m={2} w="full">
                                                Login
                                            </Button>
                                        </RouterLink>
                                        <RouterLink to="/signup" onClick={handleMenuClose}>
                                            <Button size="lg" variant="outline" m={2} w="full">
                                                Signup
                                            </Button>
                                        </RouterLink>
                                    </>
                                )}
                            </Flex>
                        </Box>
                    </Collapse>
                )}
            </Container>
        </Box>
    );
};

export default NavBar;