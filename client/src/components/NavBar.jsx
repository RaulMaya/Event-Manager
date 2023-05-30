import React from 'react';
import Auth from '../utils/auth';
import { Box, Flex, Text, Button, useColorModeValue, IconButton, Collapse, Link } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';


const NavBar = () => {
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <Box
            as="nav"
            bg={useColorModeValue('purple.500', 'purple.900')}
            color="white"
            px={{ base: 2, md: 4 }}
            py={2}
        >
            <Flex align="center" justify="space-between">
                <Flex align="center">
                    <Link as={RouterLink} to="/" mr={2} color="white" _hover={{ color: 'whiteAlpha.800' }}>
                        <Text fontSize="2xl" fontWeight="extrabold" letterSpacing="wide" textTransform="uppercase">
                            PartyMaster
                        </Text>
                    </Link>
                </Flex>
                <IconButton
                    display={{ base: 'block', md: 'none' }}
                    aria-label="Open Menu"
                    size="lg"
                    icon={show ? <CloseIcon /> : <HamburgerIcon />}
                    variant="ghost"
                    onClick={handleToggle}
                />

                <Collapse in={true} display={{ base: 'none', md: 'flex' }}>
                    <Flex
                        flex={{ base: 'column', md: 'row' }}
                        ml={{ base: 0, md: 3 }}
                        align="center"
                        justify={{ base: 'center', md: 'end' }}
                        width={{ base: 'full', md: 'auto' }}
                    >
                        {Auth.loggedIn() ? (
                            <>
                                <Link as={RouterLink} to="/createEvent">
                                    <Button size="lg" colorScheme="purple" variant="solid" m={2}>
                                        Create Event
                                    </Button>
                                </Link>
                                <Link as={RouterLink} to="/userProfile">
                                    <Button size="lg" colorScheme="purple" variant="solid" m={2}>
                                        User Profile
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" m={2} onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link as={RouterLink} to="/login">
                                    <Button size="lg" colorScheme="purple" variant="solid" m={2}>
                                        Login
                                    </Button>
                                </Link>
                                <Link as={RouterLink} to="/signup">
                                    <Button size="lg" variant="outline" m={2}>
                                        Signup
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Flex>
                </Collapse>
            </Flex>
        </Box>
    );
}

export default NavBar;