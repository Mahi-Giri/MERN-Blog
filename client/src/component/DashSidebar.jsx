import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight, HiDocumentText } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOutFailure, signOutStart, signOutSuccess } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DashSidebar = () => {
    const location = useLocation();
    const [tab, setTab] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((store) => store.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location]);

    const handleSignOut = async () => {
        try {
            dispatch(signOutStart());
            const response = await fetch("/api/v1/user/signout", {
                method: "POST",
            });
            const data = await response.json();
            if (response.ok) {
                navigate("/");
                dispatch(signOutSuccess("User signout successfully"));
            } else {
                dispatch(signOutFailure(data.message));
            }
        } catch (error) {
            dispatch(signOutFailure(error.message));
        }
    };

    return (
        <Sidebar className="w-full md:w-56 ">
            <Sidebar.Items>
                <Sidebar.ItemGroup className="flex flex-col gap-1">
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            active={tab === "profile"}
                            icon={HiUser}
                            label={currentUser.isAdmin ? "Admin" : "User"}
                            labelColor="dark"
                            as="div"
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <Link to="/dashboard?tab=post">
                            <Sidebar.Item active={tab === "post"} icon={HiDocumentText} as="div">
                                Post
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default DashSidebar;
