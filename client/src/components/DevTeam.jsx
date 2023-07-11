import React from "react";
import { Flex, Image, Text, Link, Box } from "@chakra-ui/react";
import { FaGithub, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const DeveloperCard = ({ developer }) => {
    const boxBg = 'white'; // Set the background color of the card
    const mainText = 'black'; // Set the color of the main text
    const secondaryText = 'gray'; // Set the color of the secondary text

    return (
        <Box
            borderRadius='20px'
            bg={boxBg}
            p='20px'
            h='345px'
            w={{ base: "315px", md: "345px" }}
            alignItems='center'
            direction='column'
            style={{
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', // Add aesthetic shadow
            }}
            m="20px" // Add separation between cards
        >
            <Image
                src='https://i.ibb.co/xmP2pS6/Profile.png'
                maxW='100%'
                borderRadius='20px'
            />
            <Flex flexDirection='column' mb='30px'>
                <Image
                    src={developer.image}
                    border='5px solid red'
                    mx='auto'
                    borderColor={boxBg}
                    width='68px'
                    height='68px'
                    mt='-38px'
                    borderRadius='50%'
                />
                <Text
                    fontWeight='600'
                    color={mainText}
                    textAlign='center'
                    fontSize='xl'
                >
                    {developer.name}
                </Text>
                <Text
                    color={secondaryText}
                    textAlign='center'
                    fontSize='lg'
                    fontWeight='500'
                >
                    {developer.position}
                </Text>
            </Flex>
            <Flex justify='space-between' w='100%' px='36px'>
                <Flex flexDirection='column' alignItems='center'>
                    <Link
                        href={developer.github}
                        isExternal
                        _hover={{ color: "red.500", textDecoration: "none" }}
                    >
                        <FaGithub size={30} color="purple" style={{ transition: '0.3s' }} />
                    </Link>
                    <Text color={secondaryText} fontWeight='500'>
                        GitHub
                    </Text>
                </Flex>
                <Flex flexDirection='column' alignItems='center'>
                    <Link
                        href={`https://wa.me/${developer.whatsapp}`}
                        isExternal
                        _hover={{ color: "red.500", textDecoration: "none" }}
                    >
                        <FaWhatsapp size={30} color={"green"} style={{ transition: '0.3s' }} />
                    </Link>
                    <Text color={secondaryText} fontWeight='500'>
                        WhatsApp
                    </Text>
                </Flex>
                <Flex flexDirection='column' alignItems='center'>
                    <Link
                        href={`mailto:${developer.email}`}
                        isExternal
                        _hover={{ color: "red.500", textDecoration: "none" }}
                    >
                        <FaEnvelope size={30} color={"gold"} style={{ transition: '0.3s' }} />
                    </Link>
                    <Text color={secondaryText} fontWeight='500'>
                        Email
                    </Text>
                </Flex>
            </Flex>

        </Box>
    );
}

export default DeveloperCard