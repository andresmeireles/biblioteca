import { Card, CardContent, CardHeader } from "@mui/material";
import React, { ReactElement } from "react";
import Scaffold from "../../../core/templates/Scaffold";

const MyBooks = function (): ReactElement {
    return (
        <Scaffold>
            <Card>
                <CardHeader title="livros de alguém" />
                <CardContent>livros</CardContent>
            </Card>
        </Scaffold>
    );
};

export default MyBooks;
