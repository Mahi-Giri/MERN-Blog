import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { HiInformationCircle, HiOutlineExclamationCircle } from "react-icons/hi";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
    deleteAccountFailure,
    deleteAccountStart,
    deleteAccountSuccess,
    updateFailure,
    updateStart,
    updateSuccess,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const DashProfile = () => {
    const { currentUser, error } = useSelector((store) => store.user);

    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(0);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserFailure, setUpdateUserFailure] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filePickerRef = useRef();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setImageFileUploadingProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError("Could not upload image (File must be less than 2MB)");
                setImageFileUploadingProgress(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                });
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserSuccess(null);
        setUpdateUserFailure(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserFailure("No changes were made");
            return;
        }
        if (imageFileUploading) {
            setUpdateUserFailure("Please wait for the image file upload");
            return;
        }

        try {
            dispatch(updateStart());
            const response = await fetch(`/api/v1/user/update/${currentUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User updated successfully");
            } else {
                setUpdateUserFailure(data.message);
                dispatch(updateFailure(data.message));
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserFailure(error.message);
        }
    };

    const handleDeleteUser = async () => {
        try {
            setShowModal(false);
            dispatch(deleteAccountStart());
            const response = await fetch(`/api/v1/user/delete/${currentUser._id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (response.ok) {
                navigate("/");
                dispatch(deleteAccountSuccess(data));
            } else {
                dispatch(deleteAccountFailure(data.message));
            }
        } catch (error) {
            dispatch(deleteAccountFailure(error.message));
        }
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
                <div
                    className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                    onClick={() => filePickerRef.current.click()}
                >
                    {imageFileUploadingProgress && (
                        <CircularProgressbar
                            value={imageFileUploadingProgress || 0}
                            text={`${imageFileUploadingProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})`,
                                },
                            }}
                        />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user"
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] absolute top-0 ${
                            imageFileUploadingProgress && imageFileUploadingProgress < 100 && "opacity-30"
                        }`}
                    />
                </div>

                {imageFileUploadError && (
                    <Alert color="failure" icon={HiInformationCircle}>
                        {imageFileUploadError}
                    </Alert>
                )}

                <TextInput
                    type="text"
                    id="username"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="Email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <TextInput type="password" id="password" placeholder="Password" onChange={handleChange} />

                <Button type="submit" gradientDuoTone="purpleToBlue" outline>
                    Update
                </Button>
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span className="cursor-pointer" onClick={() => setShowModal(true)}>
                    Delete Account
                </span>
                <span className="cursor-pointer">Sign Out</span>
            </div>
            {updateUserSuccess && (
                <Alert color="success" className="mt-5">
                    {updateUserSuccess}
                </Alert>
            )}
            {updateUserFailure && (
                <Alert color="failure" className="mt-5">
                    {updateUserFailure}
                </Alert>
            )}
            {error && (
                <Alert color="failure" className="mt-5">
                    {error}
                </Alert>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                            Are you sure want to delete an account
                        </h3>
                        <div className="flex justify-center gap-7">
                            <Button color="failure" onClick={handleDeleteUser}>
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

export default DashProfile;
