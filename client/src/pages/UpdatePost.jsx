import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

const UpdatePost = () => {
    const [file, setFile] = useState(null);
    const [imageUploadProcess, setImageUploadProcess] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((store) => store.user);

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const response = await fetch(`/api/v1/post/getPosts?postId=${postId}`);
                const data = await response.json();
                if (!response.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                } else {
                    setPublishError(null);
                    setFormData(data.post[0]);
                }
            };
            fetchPost();
        } catch (error) {
            console.log(error.message);
        }
    }, [postId]);

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError("Please select an image");
                return;
            }
            setImageUploadError(null);

            const storage = getStorage(app);
            const fileName = new Date().getTime() + "-" + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setImageUploadProcess(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError("Image upload failed");
                    setImageUploadProcess(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProcess(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError("Image upload failed");
            setImageUploadProcess(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/post/updatePost/${formData._id}/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setPublishError(data.message);
                return;
            } else {
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError("Something went wrong");
        }
    };

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        required
                        id="title"
                        className="flex-1"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <Select
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        value={formData.category}
                    >
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React JS</option>
                        <option value="nextjs">Next JS</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                    <Button
                        type="button"
                        gradientDuoTone="purpleToBlue"
                        size="sm"
                        outline
                        onClick={handleUploadImage}
                        disabled={imageUploadProcess}
                    >
                        {imageUploadProcess ? (
                            <div className="w-16">
                                <CircularProgressbar value={imageUploadProcess} text={`${imageUploadProcess || 0}%`} />
                            </div>
                        ) : (
                            "Upload Image"
                        )}
                    </Button>
                </div>
                {imageUploadError && <Alert color="failure"> {imageUploadError}</Alert>}
                {formData.image && <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />}
                <ReactQuill
                    theme="snow"
                    placeholder="Write Something...."
                    value={formData.content}
                    className="h-72 mb-12"
                    required
                    onChange={(value) => {
                        setFormData({ ...formData, content: value });
                    }}
                />
                <Button type="submit" gradientDuoTone="purpleToPink">
                    Update post
                </Button>
                {publishError && (
                    <Alert color="failure" icon={HiInformationCircle} className="mt-5">
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    );
};

export default UpdatePost;