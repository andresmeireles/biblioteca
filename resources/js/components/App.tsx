import React, { ReactElement } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AuthRoute from "./core/components/Routes/AuthRoute";
import NonAuthRoute from "./core/components/Routes/NonAuthRoute";
import AuthProvider from "./core/contexts/AuthProvider/AuthProvider";
import Home from "./features/Home/Home";
import Home2 from "./features/Home/Home2";
import Login from "./features/Login/Login";

const App = function (): ReactElement {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={<NonAuthRoute element={<Login />} />}
                    />
                    <Route
                        path="/"
                        element={<AuthRoute element={<Home />} />}
                    />
                    <Route
                        path="/h"
                        element={<AuthRoute element={<Home2 />} />}
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
