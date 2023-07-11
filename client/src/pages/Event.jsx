import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_EVENT } from '../utils/queries';
import { CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from '../utils/mutations';
import NotFound from '../components/NotFound';
import LeafletMap from '../components/LeafletMap';
import {
    Container,
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    IconButton,
    Stack,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useToast,
    Flex,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Spinner,
    Td,
    TableCaption,
    TableContainer,
    Image,
    Spacer
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { wrap } from 'framer-motion';

const SingleEvent = () => {
    const { id } = useParams();
    const { loading, error, data, refetch } = useQuery(QUERY_SINGLE_EVENT, {
        variables: { eventId: id },
    });
    const [commentText, setCommentText] = useState('');
    const [commentEditId, setCommentEditId] = useState(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const [createComment, { error: createCommentError }] = useMutation(CREATE_COMMENT);
    const [updateComment, { error: updateCommentError }] = useMutation(UPDATE_COMMENT);
    const [deleteComment, { error: deleteCommentError }] = useMutation(DELETE_COMMENT);

    const toast = useToast();

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        try {
            if (commentEditId) {
                // Edit existing comment
                await updateComment({
                    variables: {
                        commentId: commentEditId,
                        commentText,
                    },
                });

                setCommentEditId(null);
                toast({
                    title: 'Comment Updated',
                    description: 'Your comment has been updated successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                // Create new comment
                await createComment({
                    variables: {
                        eventId: id,
                        userId: Auth.getUser().data._id, // use the logged in user's id
                        commentText,
                    },
                });

                toast({
                    title: 'Comment Submitted',
                    description: 'Your comment has been submitted successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }

            setCommentText('');
            refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCommentEdit = (commentId, commentText) => {
        setCommentEditId(commentId);
        setCommentText(commentText);
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await deleteComment({
                variables: {
                    deleteCommentId: commentId,
                },
            });

            setShowDeleteAlert(false);
            toast({
                title: 'Comment Deleted',
                description: 'The comment has been deleted successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            refetch();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (createCommentError) {
            console.error(createCommentError);
        }
        if (updateCommentError) {
            console.error(updateCommentError);
        }
        if (deleteCommentError) {
            console.error(deleteCommentError);
        }
    }, [createCommentError, updateCommentError, deleteCommentError]);


    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner color="purple.500" />
            </Box>
        );
    }
    if (error) return <p>Error :(</p>;

    const event = data?.event;

    if (!event) return <NotFound />;

    const bgImage = `url('${event.mainImg}')`
    const bgPortraitImage = `url('${event.portraitImg}')`

    return (
        <Container maxW="container.xl" mt={5}>
            <Container maxW={"container.xl"}
                height={"300px"}
                backgroundImage={bgPortraitImage}
                backgroundSize="cover"
                backgroundPosition="center"
                p={0}>
                <Flex ps={2} pt={2} direction={"column"} h={"100%"} color={"black"} bg={"whiteAlpha.600"} w={"500px"} borderRightWidth={'3px'} borderColor={'purple.500'}>
                    <Text m={0} p={1}>Event Name:</Text>
                    <Heading display={"flex"} fontSize={"2xl"} p={1}>
                        {event.eventName}
                    </Heading>
                    <Text m={0} p={1}>Event Description:</Text>
                    <Text p={1} display={"flex"} as={'b'} fontSize={'lg'}>
                        {event.eventDescription}
                    </Text>
                </Flex>
            </Container>

            <Flex my={4} minWidth='max-content' alignItems='center' gap='2'>
                {/* Event Information */}

                <Container
                    maxW={["100%", "100%", "500px", "600px", "600px"]}
                    height={["300px", "400px", "500px", "600px", "700px"]}
                    backgroundImage={bgImage}
                    backgroundSize="cover"
                    backgroundPosition="center"
                >
                </Container>

                {/* Map Section */}
                <Spacer />
                <LeafletMap latitude={event.eventLocation.lat} longitude={event.eventLocation.lon} name={event.eventName} />
            </Flex>
            <Box>
                <TableContainer>
                    <Table variant='striped' colorScheme='purple' >
                        <TableCaption>All your event details</TableCaption>
                        <Thead>

                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td><strong>Event Name</strong>:</Td>
                                <Td>{event.eventName}</Td>
                                <Td><strong>Event Capacity</strong>:</Td>
                                <Td >{event.eventCapacity}</Td>
                            </Tr>
                            <Tr>
                                <Td><strong>Event Start Date</strong>:</Td>
                                <Td>{format(new Date(event.eventStartDate), 'MMMM dd, yyyy')}</Td>
                                <Td ><strong>Event Type</strong>:</Td>
                                <Td >{event.eventCategory}</Td>
                            </Tr>
                            <Tr>
                                <Td><strong>Minimum Age</strong>:</Td>
                                <Td >{event.minAge}</Td>
                                <Td ><strong>Created By</strong>:</Td>
                                <Td >{event.createdBy.username}</Td>
                            </Tr>
                            <Tr>
                                <Td><strong>Address</strong>:</Td>
                                <Td>{event.eventLocation.address}</Td>
                                <Td><strong>City, Country</strong>:</Td>
                                <Td>{event.eventLocation.city}, {event.eventLocation.country}</Td>
                            </Tr>
                        </Tbody>
                        <Tfoot>

                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
            {/* Comment Section */}
            <Box mb={10}>
                <Heading size="lg" mb={10} mt={10}>
                    Comments
                </Heading>
                {event.comments.map((comment) => (
                    <Box key={comment._id} bg="gray.100" p={4} mb={4} borderRadius="md" display="flex" alignItems="flex-start">
                        <Text flex={1}>
                            <strong>{comment.user.username}:</strong> {comment.commentText}
                        </Text>
                        {Auth.loggedIn() && comment.user._id === Auth.getUser()?.data?._id && (
                            <Stack direction="row" ml={2}>
                                <IconButton
                                    icon={<EditIcon />}
                                    aria-label="Edit Comment"
                                    variant="outline"
                                    colorScheme="purple"
                                    size="sm"
                                    onClick={() => handleCommentEdit(comment._id, comment.commentText)}
                                />
                                <IconButton
                                    icon={<DeleteIcon />}
                                    aria-label="Delete Comment"
                                    variant="outline"
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => setShowDeleteAlert(comment._id)}
                                />
                            </Stack>
                        )}
                    </Box>
                ))}
                {Auth.loggedIn() && (
                    <form onSubmit={handleCommentSubmit}>
                        <FormControl mb={4}>
                            <FormLabel>Add a Comment</FormLabel>
                            <Input
                                type="text"
                                name="commentText"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Enter your comment"
                                required
                            />
                        </FormControl>
                        <Button colorScheme="purple" type="submit">
                            Submit Comment
                        </Button>
                    </form>
                )}
            </Box>

            {/* Delete Comment Alert */}
            <AlertDialog isOpen={showDeleteAlert} leastDestructiveRef={null} onClose={() => setShowDeleteAlert(false)}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Comment
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete this comment?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button variant="ghost" onClick={() => setShowDeleteAlert(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => handleCommentDelete(showDeleteAlert)}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Container>
    );

};

export default SingleEvent;
