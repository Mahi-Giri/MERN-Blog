import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../component/DashSidebar";
import DashProfile from "../component/DashProfile";
import DashPost from "../component/DashPost";
import DashUsers from "../component/DashUsers";
import DashComment from "../component/DashComment";
import DashboarComp from "../component/DashboarComp";

const Dashboard = () => {
    const location = useLocation();

    const [tab, setTab] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location]);

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="md:w-56">
                <DashSidebar />
            </div>
            <div className="w-full">
                {tab === "profile" && <DashProfile />}
                {tab === "post" && <DashPost />}
                {tab === "users" && <DashUsers />}
                {tab === "comments" && <DashComment />}
                {tab === "dash" && <DashboarComp />}
            </div>
        </div>
    );
};

export default Dashboard;
