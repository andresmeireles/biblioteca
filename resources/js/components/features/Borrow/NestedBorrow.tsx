import React, { ReactElement } from "react";
import { Outlet } from "react-router";

const NestedBorrow = function (): ReactElement {
    return <Outlet />;
};

export default NestedBorrow;
