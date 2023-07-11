import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

import { useQuery } from '@apollo/client';
import { Box, Heading, Spinner, Alert, Flex } from '@chakra-ui/react';

import { QUERY_ALL_EVENTS } from '../utils/queries';

import EventList from '../components/EventList';
import HeroSection from '../components/Hero';
import DeveloperCard from '../components/DevTeam';

const Home = ({ isLoggedIn }) => {
    const { loading, error, data } = useQuery(QUERY_ALL_EVENTS);
    const events = data?.events || [];
    
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner color="purple.500" />
            </Box>
        );
    }

    if (error) {
        return <Alert status="error">{error.message} :(</Alert>;
    }

    const developers = [
        {
            name: "Raul Maya",
            image: "team/raulmaya.jpeg",
            position: "Web Developer",
            github: "https://github.com/RaulMaya",
            whatsapp: "+528331597006",
            email: "raulmayas20@gmail.com",
        },
        {
            name: "David Dominguez",
            image: "team/daviddominguez.jpg",
            position: "Web Developer",
            github: "https://github.com/Drums180",
            whatsapp: "+528120384836",
            email: "./Projects/MarsScraping.png",
        },
        {
            name: "Samuel Russek",
            image: "team/samuelrussek.jpg",
            position: "Web Developer",
            github: "https://github.com/SamRF13",
            whatsapp: "+525535211344",
            email: "./Projects/NotesApp.png",
        },
        {
            name: "Freddy Corona",
            image: "team/freddycorona.jpg",
            position: "Web Developer",
            github: "https://github.com/cryptovoyager",
            whatsapp: "+525584834472",
            email: "./Projects/NuevoLeonElections.png",
        },
        {
            name: "Saul Wade",
            image: "team/saulwade.jpg",
            position: "Web Developer",
            github: "https://github.com/saulwade",
            whatsapp: "+529221574450",
            email: "./Projects/SoccerQuiz.png",
        }
    ];

    return (
        <Box maxW="container-fluid" mx="auto" p={4}>
            <HeroSection />
            <Box display="flex" alignItems="center" justifyContent="flex-start" mb={4} mt={5}>
                <Heading as="h1" size="xl" marginRight={4} color="purple.500">
                    Trending Events
                </Heading>
                <FiTrendingUp size={24} ml={4} />
            </Box>
            <Box mb={4}>
                <EventList events={events} title="All our events..." isAuthenticated={isLoggedIn} showAllEvents={false} />
            </Box>
            <Flex bg="purple.500" justify='center' align='center' direction='row' wrap='wrap'>
                {developers.map((developer, index) => (
                    <DeveloperCard key={index} developer={developer} />
                ))}
            </Flex>
        </Box>
    );
};

export default Home;