import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector((store) => store.user);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment.length > 200) return;

        try {
            const response = await fetch("/api/v1/comment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });

            const data = await response.json();

            if (response.ok) setComment("");
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full p-3">
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-xs font-semibold">
                    <p>Sign in as:</p>
                    <img
                        className="h-5 w-5 object-cover rounded-full"
                        src={currentUser.profilePicture}
                        alt={currentUser.username}
                    />
                    <Link to="/dashboard?tab=profile" className="text-xs text-cyan-500 font-semibold hover:underline">
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    You must be logged in to comment.
                    <Link to="/sign-in" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </div>
            )}

            {currentUser && (
                <form className="border border-teal-500 rounded-md p-3" onSubmit={handleSubmit}>
                    <Textarea
                        placeholder="Add a comment..."
                        rows="3"
                        maxLength="200"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-gray-500 text-sm">{200 - comment.length} character remaining</p>
                        <Button outline gradientDuoTone="purpleToBlue" type="submit">
                            Submit
                        </Button>
                    </div>
                    {error && (
                        <Alert color="failure" className="mt-5">
                            {error}
                        </Alert>
                    )}
                </form>
            )}
        </div>
    );
};

export default CommentSection;