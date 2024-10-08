import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashComment = () => {
    const { currentUser } = useSelector((store) => store.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/v1/comment/getComments`);
                const data = await response.json();
                if (response.ok) {
                    setComments(data.comments);
                    if (data.comments.length < 9) setShowMore(false);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) fetchComments();
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const response = await fetch(`/api/v1/comment/getComments?startIndex=${startIndex}`);
            const data = await response.json();
            if (response.ok) {
                setComments((prev) => [...prev, ...data.comments]);

                if (data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteComment = async () => {
        setShowModal(false);
        try {
            const response = await fetch(`/api/v1/comment/deleteComment/${commentIdToDelete}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
                setShowModal(false);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && comments.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>Date Updated</Table.HeadCell>
                            <Table.HeadCell>Comment Content</Table.HeadCell>
                            <Table.HeadCell>Number of Like</Table.HeadCell>
                            <Table.HeadCell>PostID</Table.HeadCell>
                            <Table.HeadCell>UserID</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        {comments.map((comment) => (
                            <Table.Body key={comment._id} className="divide-y">
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>{comment.content}</Table.Cell>
                                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                                    <Table.Cell>{comment.postId}</Table.Cell>
                                    <Table.Cell>{comment.userId}</Table.Cell>
                                    <Table.Cell>
                                        <span
                                            className="font-medium text-red-500 cursor-pointer hover:underline"
                                            onClick={() => {
                                                setShowModal(true);
                                                setCommentIdToDelete(comment._id);
                                            }}
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className="w-full text-teal-500 self-center text-sm py-7 hover:font-semibold"
                        >
                            Show more
                        </button>
                    )}
                </>
            ) : (
                <p>You don't have a Comment</p>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                            Are you sure want to delete this Comment?
                        </h3>
                        <div className="flex justify-center gap-7">
                            <Button color="failure" onClick={handleDeleteComment}>
                                Yes I'm sure
                            </Button>
                            <Button color="gray" onClick={() => setShowModal(false)}>
                                No, Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DashComment;
