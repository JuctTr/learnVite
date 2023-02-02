import React, { useState, useMemo } from "react";
import RateCircle from "../RateCircle";

function Demo3() {
    const [rate, setRate] = useState(0.25);

    const onChange = () => {
        setRate(0.75);
    };

    const renderContent = () => {
        const total = 4;
        return `${total * rate} / ${total}`;
    };

    return (
        <>
            <button onClick={onChange}>点击</button>
            <RateCircle start={90} rate={rate} content={renderContent} />
        </>
    );
}

export default Demo3;
