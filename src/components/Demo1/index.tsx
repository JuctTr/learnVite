import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

export default function Demo1() {
    const [open, setOpen] = useState(false);
    const spring = useSpring({ width: open ? 240 : 40 });

    const clickAnimated = () => {
        console.log("clickAnimated => ");
        setOpen((prev) => !prev);
    };

    return (
        <animated.div
            style={{
                lineHeight: "40px",
                textAlign: "center",
                height: 40,
                backgroundColor: "azure",
                border: "1px solid darkslategrey",
                borderRadius: 8,
                cursor: "pointer",
                ...spring
            }}
            onClick={clickAnimated}
        >
            {spring.width.to((x) => x.toFixed(0))}
        </animated.div>
    );
}
