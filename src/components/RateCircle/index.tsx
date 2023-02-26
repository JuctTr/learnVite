import React, { useMemo } from "react";

import "./index.scss";

/**
 * 默认中心坐标为左上角，即 (0, 0)
 * @param deg
 * @param x 横坐标偏移
 * @param y 纵坐标偏移
 * @returns
 */
function calcMatrix(deg: number, x = 0, y = 0) {
    const cosVal = Math.cos((deg * Math.PI) / 180),
        sinVal = Math.sin((deg * Math.PI) / 180);
    const valTransform = `matrix(${cosVal.toFixed(6)},${sinVal.toFixed(6)},${(
        -1 * sinVal
    ).toFixed(6)},${cosVal.toFixed(6)},${x},${y})`;
    return valTransform;
}

interface IProps {
    start?: number;
    rate?: number; // 百分率
    radius?: number; // 外圈圆半径
    strokeWidth?: number; // 圆环的宽度
    strokeColor?: string; // 圆环的颜色
    activeStrokeColor?: string; // 百分比进度颜色
    content?: () => React.ReactNode;
}

function RateCircle(props: IProps) {
    const {
        start = 0,
        rate = 0.5,
        radius = 100,
        strokeWidth = 10,
        strokeColor = "#1E71FF",
        activeStrokeColor = "#8CB8FF",
        content = () => null
    } = props;

    const diameter = useMemo(() => {
        return 2 * radius;
    }, [radius]);

    const transform = calcMatrix(start, 0, 0);

    const innerRadius = useMemo(() => {
        return radius - strokeWidth;
    }, [radius, strokeWidth]);

    const strokeDasharray = useMemo(() => {
        const perimeter = Math.PI * 2 * innerRadius;
        const showLength = rate ? rate * perimeter : 0;
        return `${showLength} 1000`;
    }, [rate, innerRadius]);

    const viewbox = useMemo(() => {
        return `0 0 ${diameter} ${diameter}`;
    }, [diameter]);

    return (
        <div className="rate-circle">
            <svg width={diameter} height={diameter} viewBox={viewbox}>
                {/*  底部的灰色背景圆环 */}
                <circle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    strokeWidth={strokeWidth}
                    stroke={activeStrokeColor}
                    fill="none"
                ></circle>
                {/* 需要显示的圆环  */}
                <circle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    strokeWidth={strokeWidth}
                    stroke={strokeColor}
                    fill="none"
                    transform={transform}
                    style={{
                        transformOrigin: "center"
                    }}
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="round"
                ></circle>
            </svg>
            <div className="rate-circle-content">{content()}</div>
        </div>
    );
}

export default RateCircle;
