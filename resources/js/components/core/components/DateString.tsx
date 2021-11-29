import React, { ReactElement } from "react";

const DateString = function (props: { date: string }): ReactElement {
    const { date } = props;
    const dt = new Date(date);
    const d = dt.getDate();
    const m = dt.getMonth() + 1;
    const year = dt.getFullYear();
    const day = d < 10 ? `0${d}` : d;
    const month = m < 10 ? `0${m}` : m;
    const fullDate = `${day}/${month}/${year}`;

    return <span>{fullDate}</span>;
};

export default DateString;
