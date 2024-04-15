import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./component/Header";
import FooterCom from "./component/FooterCom";
import PrivateRoute from "./component/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import OnlyAdminPrivateRoute from "./component/OnlyAdminPrivateRoute";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                <Route element={<OnlyAdminPrivateRoute />}>
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/update-post/:postId" element={<UpdatePost />} />
                </Route>

                <Route path="/project" element={<Projects />} />
                <Route path="/post/:postSlug" element={<PostPage />} />
            </Routes>
            <FooterCom />
        </BrowserRouter>
    );
}

export default App;
