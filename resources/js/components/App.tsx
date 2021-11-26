import React, { ReactElement } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthRoute from "./core/components/Routes/AuthRoute";
import NonAuthRoute from "./core/components/Routes/NonAuthRoute";
import AuthProvider from "./core/contexts/AuthProvider/AuthProvider";
import Home from "./features/Home/Home";
import Login from "./features/Auth/Login";
import SignUp from "./features/Auth/SignUp";
import "react-toastify/dist/ReactToastify.css";
import R404 from "./features/Misc/Route404";
import Add from "./features/AddBook/Add";
import ViewAllBooks from "./features/ViewBooks/ViewAllBoks";

const App = function (): ReactElement {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route
                        path="/login"
                        element={<NonAuthRoute element={<Login />} />}
                    />
                    <Route
                        path="/signup"
                        element={<NonAuthRoute element={<SignUp />} />}
                    />
                    <Route
                        path="/"
                        element={<AuthRoute element={<Home />} />}
                    />
                    <Route
                        path="/add"
                        element={<AuthRoute element={<Add />} />}
                    />
                    <Route
                        path="/book"
                        element={<AuthRoute element={<ViewAllBooks />} />}
                    />
                    <Route path="/*" element={<R404 />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
