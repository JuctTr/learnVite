import { useState, useRef, ReactNode } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { getScrollParent } from "./get-scroll-parent";
import { rubberbandIfOutOfBounds } from "./rubberband";
import "./index.scss";

const classPrefix = "lzd-pull-to-refresh";

export type PullStatus = "pulling" | "canRelease" | "refreshing" | "complete";

export type PullToRefreshProps = {
    onRefresh?: () => Promise<unknown>;
    pullingText?: ReactNode;
    canReleaseText?: ReactNode;
    refreshingText?: ReactNode;
    completeText?: ReactNode;
    completeDelay?: number;
    headHeight?: number;
    threshold?: number;
    disabled?: boolean;
    renderText?: (status: PullStatus) => ReactNode;
    children?: React.ReactNode;
};

export const defaultProps = {
    pullingText: "下拉刷新",
    canReleaseText: "释放立即刷新",
    refreshingText: "加载中...",
    completeText: "刷新成功",
    completeDelay: 500,
    disabled: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onRefresh: () => {}
};

function getScrollTop(element: Window | Element) {
    return "scrollTop" in element ? element.scrollTop : element.scrollY;
}

export default function PullToRefresh(props: PullToRefreshProps) {
    const myProps = {
        ...defaultProps,
        ...props
    };
    const [springStyles, api] = useSpring(() => ({
        from: { height: 0 },
        config: {
            tension: 300,
            friction: 30,
            clamp: true
        }
    }));

    const headHeight = props.headHeight ?? 40;
    const threshold = props.threshold ?? 40;

    const [status, setStatus] = useState<PullStatus>("pulling");

    const elementRef = useRef<HTMLDivElement>(null);

    const pullingRef = useRef(false);

    async function doRefresh() {
        api.start({ height: headHeight });
        setStatus("refreshing");
        try {
            // 请求后台接口
            // await props.onRefresh();
            setStatus("complete");
        } catch (e) {
            // 异常流
            api.start({
                to: async (next) => {
                    await next({ height: 0 });
                    setStatus("pulling");
                }
            });
            throw e;
        }
        // 下拉刷新是否延迟？
        if (myProps.completeDelay > 0) {
            // 替换 sleep 函数
            await new Promise((resolve) =>
                setTimeout(resolve, myProps.completeDelay)
            );
        }
        api.start({
            to: async (next) => {
                await next({ height: 0 });
                setStatus("pulling");
            }
        });
    }

    useDrag(
        (state) => {
            if (status === "refreshing" || status === "complete") return;

            const { event } = state;

            console.log("用户往下拉，开始一刻 => state.first ", state.first);
            console.log("用户往下拉，结束一刻 => state.last ", state.last);
            // 用户往下拉 到 释放 的最后一刻，这个值表示是否到达最后一刻
            if (state.last) {
                pullingRef.current = false;
                if (status === "canRelease") {
                    doRefresh();
                } else {
                    api.start({ height: 0 });
                }
                return;
            }

            // 用户下拉的坐标 y
            const [, y] = state.movement;
            if (state.first && y > 0) {
                // 用户点击的目标值
                const target = state.event.target;

                if (!target || !(target instanceof Element)) return;
                // 遍历该目标元素的父元素，找到一个overflow 不为 visible 的父元素节点
                let scrollParent = getScrollParent(target);

                console.log(scrollParent);

                // eslint-disable-next-line no-constant-condition
                while (true) {
                    if (!scrollParent) return;
                    const scrollTop = getScrollTop(scrollParent);
                    console.log(scrollTop);
                    // scrollTop 大于 0 ，表示用户所触摸的区域，还没有滑到页面内容的顶部，直接退出
                    if (scrollTop > 0) {
                        return;
                    }
                    if (scrollParent instanceof Window) {
                        break;
                    }
                    scrollParent = getScrollParent(
                        scrollParent.parentNode as Element
                    );
                }
                pullingRef.current = true;
            }

            if (!pullingRef.current) return;

            if (event.cancelable) {
                event.preventDefault();
            }
            event.stopPropagation();
            const height = Math.max(
                rubberbandIfOutOfBounds(y, 0, 0, headHeight * 5, 0.5),
                0
            );
            api.start({ height });
            setStatus(height > threshold ? "canRelease" : "pulling");
        },
        {
            pointer: { touch: true },
            axis: "y",
            target: elementRef,
            enabled: true,
            eventOptions: { passive: false }
        }
    );

    const renderStatusText = () => {
        if (myProps.renderText) {
            return myProps.renderText?.(status);
        }

        if (status === "pulling") return myProps.pullingText;
        if (status === "canRelease") return myProps.canReleaseText;
        if (status === "refreshing") return myProps.refreshingText;
        if (status === "complete") return myProps.completeText;
    };

    return (
        <animated.div ref={elementRef}>
            <animated.div
                style={springStyles}
                className={`${classPrefix}-head`}
            >
                <div
                    className={`${classPrefix}-head-content`}
                    style={{
                        height: headHeight,
                        backgroundColor: "red"
                    }}
                >
                    {renderStatusText()}
                </div>
            </animated.div>
            {props.children}
        </animated.div>
    );
}
