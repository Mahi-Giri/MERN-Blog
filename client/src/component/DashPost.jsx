import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPost = () => {
    const { currentUser } = useSelector((store) => store.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/v1/post/getPosts?userId=${currentUser._id}`);
                const data = await response.json();
                if (response.ok) {
                    setUserPosts(data.post);
                    if (data.post.length < 9) setShowMore(false);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) fetchPosts();
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const response = await fetch(`/api/v1/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await response.json();
            if (response.ok) {
                setUserPosts((prev) => [...prev, ...data.post]);

                if (data.post.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const response = await fetch(`/api/v1/post/deletePost/${postIdToDelete}/${currentUser._id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>Date Updated</Table.HeadCell>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userPosts.map((post) => (
                            <Table.Body key={post._id} className="divide-y">
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt="post image"
                                                className="w-20 h-10 object-cover bg-gray-500"
                                            />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            to={`/post/${post.slug}`}
                                            className="font-medium text-gray-900 dark:text-white"
                                        >
                                            {post.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    <Table.Cell>
                                        <span
                                            className="font-medium text-red-500 cursor-pointer hover:underline"
                                            onClick={() => {
                                                setShowModal(true);
                                                setPostIdToDelete(post._id);
                                            }}
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span>
                                            <Link
                                                to={`/update-post/${post._id}`}
                                                className="text-teal-500 hover:underline"
                                            >
                                                Edit
                                            </Link>
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
                <p>You don't have a Post</p>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                            Are you sure want to delete this post?
                        </h3>
                        <div className="flex justify-center gap-7">
                            <Button color="failure" onClick={handleDeletePost}>
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

export default DashPost;
