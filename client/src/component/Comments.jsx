import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

const Comments = ({ comment, onLike, onEdit }) => {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector((store) => store.user);
    const [isEdit, setIsEdit] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(`/api/v1/user/${comment.userId}`);
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
        handleSave();
    }, [comment]);

    const handleEdit = async () => {
        setIsEdit(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`/api/v1/comment/editComment/${comment._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
            });
            if (response.ok) {
                setIsEdit(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex p-4 border-b dark:border-gray-600 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img className="w-10 h-10 rounded-full bg-gray-200" src={user.profilePicture} alt={user.username} />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-xs truncate">
                        {user ? `@${user.username}` : "anonymous user"}
                    </span>
                    <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEdit ? (
                    <>
                        <Textarea
                            className="mb-2"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        ></Textarea>
                        <div className="flex justify-end gap-2 text-xs">
                            <Button type="button" size="sm" gradientDuoTone="purpleToBlue" onClick={handleSave}>
                                Save
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                gradientDuoTone="purpleToBlue"
                                outline
                                onClick={() => setIsEdit(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-gray-500 mb-2"> {comment.content} </p>
                        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
                            <button
                                type="button"
                                className={`text-gray-400 hover:text-blue-500 ${
                                    currentUser && comment.likes.includes(currentUser._id) && "!text-blue-500"
                                }`}
                                onClick={() => onLike(comment._id)}
                            >
                                <FaThumbsUp className="text-sm " />
                            </button>
                            <p className="text-gray-400">
                                {comment.numberOfLikes > 0 &&
                                    comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")}
                            </p>
                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-blue-500"
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Comments;
