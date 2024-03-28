import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signinFailure, signinStart, signinSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const auth = getAuth(app);
    const handleGoogleClick = async () => {
        const provide = new GoogleAuthProvider();
        provide.setCustomParameters({
            prompt: "select_account",
        });
        try {
            dispatch(signinStart());
            const resultFromGoogle = await signInWithPopup(auth, provide);
            const response = await fetch("/api/v1/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoURL: resultFromGoogle.user.photoURL,
                }),
            });
            const data = await response.json();

            if (response.ok === true) {
                dispatch(signinSuccess(data));
                navigate("/");
            }

            if (response.ok === false) {
                dispatch(signinFailure(data.message));
            }
        } catch (error) {
            console.log(`Could not login with google: ${error}`);
        }
    };

    return (
        <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue With Google
        </Button>
    );
};

export default OAuth;
