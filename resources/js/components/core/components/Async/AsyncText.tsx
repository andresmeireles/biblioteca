import React, { ReactElement, useEffect, useState } from "react";

const AsyncText = function (props: {
    text: Promise<string | number>;
}): ReactElement {
    const { text } = props;
    const [response, setResponse] = useState<string | number>();

    useEffect(() => {
        const get = async () => {
            const awaitResponse = await text;
            setResponse(awaitResponse);
        };

        get();
    }, []);

    return (
        <span>{`${response === undefined ? "--" : (response as string)}`}</span>
    );
};

export default AsyncText;
