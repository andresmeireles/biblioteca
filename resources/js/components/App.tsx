import React, { ReactElement } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthRoute from "./core/components/Routes/AuthRoute";
import NonAuthRoute from "./core/components/Routes/NonAuthRoute";
import AuthProvider from "./core/contexts/AuthProvider/AuthProvider";
import Home from "./features/Home/Home";
import Login from "./features/Login/Login";
import SignUp from "./features/SignUp/SignUp";
import "react-toastify/dist/ReactToastify.css";

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
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
