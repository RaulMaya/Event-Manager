import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
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
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

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

        console.log(Auth.getUser());

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const event = data?.event;

    if (!event) return <NotFound />;

    return (
        <Container maxW="container.xl" mt={4}>
            <Flex direction='column' gap={8}>
                {/* Event Information */}
                <Box mb={4}>
                    <Heading as="h2" size="lg" mt={2}>
                        {event.eventName}
                    </Heading>
                    <img src={event.mainImg} alt={event.eventName} />
                    <Text>{event.eventDescription}</Text>
                    {/* ... other Event Information components ... */}
                </Box>

                {/* Map Section */}
                <Box mb={4}>
                    <Heading as="h3" size="md" mb={2}>
                        Location Map
                    </Heading>
                    <LeafletMap latitude={event.eventLocation.lat} longitude={event.eventLocation.lon} name={event.eventName} />
                </Box>
            </Flex>

            {/* Comment Section */}
            <Box mb={4}>
                <Heading as="h3" size="md" mb={2}>
                    Comments
                </Heading>
                {event.comments.map((comment) => (
                    <Box key={comment._id} bg="gray.100" p={4} mb={4} borderRadius="md" display="flex" alignItems="flex-start">
                        <Text flex={1}>
                            <strong>{comment.user.username}:</strong> {comment.commentText}
                        </Text>
                        {/* ... other Comment components ... */}
                    </Box>
                ))}
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
