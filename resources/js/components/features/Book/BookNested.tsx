import React, { ReactElement } from "react";
import { Outlet } from "react-router";

const BookNested = function (): ReactElement {
    return <Outlet />;
};

export default BookNested;
