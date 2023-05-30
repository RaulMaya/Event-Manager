import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { Link as RouterLink } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import Auth from '../utils/auth';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [login, { loading, error, data }] = useMutation(LOGIN);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formData },
            });

            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
            // Handle error or display error message to the user
        }
        // clear form values
        setFormData({
            username: '',
            password: '',
        });
    };

    const bgColor = useColorModeValue('purple.100', 'purple.900');
    const borderColor = useColorModeValue('purple.200', 'purple.800');
    const headingColor = useColorModeValue('purple.600', 'purple.400');
    const buttonColor = useColorModeValue('white', 'purple.600');
    const buttonHoverColor = useColorModeValue('purple.500', 'purple.700');

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={bgColor}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} color={headingColor}>
                        Sign in to your account
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool{' '}
                        <Link as={RouterLink} color={headingColor} to={'/'}>
                            features
                        </Link>{' '}
                        ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'purple.800')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        {data ? (
                            <Text>
                                Success! You may now head{' '}
                                <Link as={RouterLink} to={'/'}>
                                    back to the homepage.
                                </Link>
                            </Text>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <FormControl id="username">
                                    <FormLabel color={headingColor}>Username</FormLabel>
                                    <Input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        borderColor={borderColor}
                                    />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel color={headingColor}>Password</FormLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        borderColor={borderColor}
                                    />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        align={'start'}
                                        justify={'space-between'}
                                    >
                                        <Checkbox color={headingColor}>Remember me</Checkbox>
                                        <Link as={RouterLink} color={headingColor} to={'/'}>
                                            Forgot password?
                                        </Link>
                                    </Stack>
                                    <Button
                                        bg={headingColor}
                                        color={buttonColor}
                                        _hover={{
                                            bg: buttonHoverColor,
                                        }}
                                        type="submit"
                                        isLoading={loading}
                                    >
                                        Sign in
                                    </Button>
                                </Stack>
                                {error && <Text>Error occurred. Please try again.</Text>}
                            </form>
                        )}
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default LoginForm;
