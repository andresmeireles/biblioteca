import * as React from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
    children: React.ReactNode;
}

const Title = function (props: TitleProps) {
    const { children } = props;

    return (
        <Typography component="h2" variant="h6" color="secondary" gutterBottom>
            {children}
        </Typography>
    );
};

export default Title;
