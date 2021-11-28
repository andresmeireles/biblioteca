import React, { ReactElement } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { nanoid } from "nanoid";
import AuthRoute from "./core/components/Routes/AuthRoute";
import NonAuthRoute from "./core/components/Routes/NonAuthRoute";
import AuthProvider from "./core/contexts/AuthProvider/AuthProvider";
import Home from "./features/Home/Home";
import Login from "./features/Auth/Login";
import SignUp from "./features/Auth/SignUp";
import "react-toastify/dist/ReactToastify.css";
import R404 from "./features/Misc/Route404";
import Add from "./features/Book/AddBook/Add";
import ViewAllBooks from "./features/Book/ViewBooks/ViewAllBoks";
import EditBook from "./features/Book/EditBook/EditBook";
import BookNested from "./features/Book/BookNested";
import MyBooks from "./features/Book/MyBooks/MyBooks";
import VerifyEmail from "./features/Auth/VerifyEmail";
import EmailConfirmation from "./features/Auth/EmailConfirmation";
import ForgotPassword from "./features/Auth/ForgotPassword";
import ChangeForgotPassword from "./features/Auth/ChangeForgotPasswrod";
import AskBorrow from "./features/Borrow/AskBorrow";
import MyBorrows from "./features/Borrow/MyBorrows";
import ToApproveBorrows from "./features/Borrow/ToApproveBorrows";

const App = function (): ReactElement {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route
                        path="login"
                        element={<NonAuthRoute element={<Login />} />}
                    />
                    <Route
                        path="signup"
                        element={<NonAuthRoute element={<SignUp />} />}
                    />
                    <Route
                        path="verify-email"
                        element={<NonAuthRoute element={<VerifyEmail />} />}
                    />
                    <Route
                        path="forgot-password"
                        element={<NonAuthRoute element={<ForgotPassword />} />}
                    />
                    <Route
                        path="change-forgot-password"
                        element={
                            <NonAuthRoute element={<ChangeForgotPassword />} />
                        }
                    />
                    <Route
                        path="/"
                        element={<AuthRoute element={<Home />} />}
                    />
                    <Route
                        path="add"
                        element={<AuthRoute element={<Add />} />}
                    />
                    <Route
                        path="confirmation"
                        element={<EmailConfirmation />}
                    />
                    <Route
                        path="book"
                        element={<AuthRoute element={<BookNested />} />}
                    >
                        <Route
                            key={nanoid()}
                            path=""
                            element={<AuthRoute element={<ViewAllBooks />} />}
                        />
                        <Route
                            key={nanoid()}
                            path="user/:user"
                            element={<AuthRoute element={<MyBooks />} />}
                        />
                        <Route
                            key={nanoid()}
                            path="edit/:id"
                            element={<AuthRoute element={<EditBook />} />}
                        />
                    </Route>
                    <Route
                        path="borrow"
                        element={<AuthRoute element={<AskBorrow />} />}
                    />
                    <Route
                        path="my-borrows"
                        element={<AuthRoute element={<MyBorrows />} />}
                    />
                    <Route
                        path="to-approve-borrows"
                        element={<AuthRoute element={<ToApproveBorrows />} />}
                    />
                    <Route path="*" element={<R404 />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
