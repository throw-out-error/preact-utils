import css from "dom-css";

export function getInnerWidth(el: HTMLElement): number {
    const { clientWidth } = el;
    const { paddingLeft, paddingRight } = window.getComputedStyle(el);
    return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
}

export function getInnerHeight(el: HTMLElement): number {
    const { clientHeight } = el;
    const { paddingTop, paddingBottom } = window.getComputedStyle(el);
    return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
}

let scrollbarWidth = -1;

export function getScrollbarWidth(): number {
    if (scrollbarWidth !== -1) return scrollbarWidth;
    /* istanbul ignore else */
    if (typeof document !== "undefined") {
        const div = document.createElement("div");
        css(div, {
            width: 100,
            height: 100,
            position: "absolute",
            top: -9999,
            overflow: "scroll",
            MsOverflowStyle: "scrollbar",
        });
        document.body.appendChild(div);
        scrollbarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
    } else scrollbarWidth = 0;

    return scrollbarWidth === -1 ? 0 : scrollbarWidth;
}
