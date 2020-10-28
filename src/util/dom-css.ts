import { camelCase } from "change-case";

let div = null;
const prefixes = ["Webkit", "Moz", "O", "ms"];

export function prefixStyle(prop: string): string {
    // re-use a dummy div
    if (!div) div = document.createElement("div");

    const style = div.style;

    // prop exists without prefix
    if (prop in style) return prop;

    // borderRadius -> BorderRadius
    const titleCase = prop.charAt(0).toUpperCase() + prop.slice(1);

    // find the vendor-prefixed prop
    for (let i = prefixes.length; i >= 0; i--) {
        const name = prefixes[i] + titleCase;
        // e.g. WebkitBorderRadius or webkitBorderRadius
        if (name in style) return name;
    }

    return "";
}

const cache = { float: "cssFloat" };

/* The following list is defined in React's core */
const IS_UNITLESS = {
    animationIterationCount: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridColumn: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,

    // SVG-related properties
    fillOpacity: true,
    stopOpacity: true,
    strokeDashoffset: true,
    strokeOpacity: true,
    strokeWidth: true,
};

export function addPxToStyle(name: string, value: unknown): string {
    if (typeof value === "number" && !IS_UNITLESS[name]) return value + "px";
    else return value.toString();
}

export function style(
    element: HTMLElement,
    property: string,
    value?: unknown
): string {
    let camel = cache[property];
    if (typeof camel === "undefined") camel = detect(property);

    // may be false if CSS prop is unsupported
    if (camel) {
        if (value === undefined) return element.style[camel];

        element.style[camel] = addPxToStyle(camel, value);
    }
}

export const each = (
    element: HTMLElement,
    properties: Record<string, unknown>
): void => {
    for (const k in properties)
        if (properties.hasOwnProperty(k)) style(element, k, properties[k]);
};

function detect(cssProp: string) {
    const camel = camelCase(cssProp);
    const result = prefixStyle(camel);
    cache[camel] = cache[cssProp] = cache[result] = result;
    return result;
}

export function get(element, properties): string {
    if (Array.isArray(properties))
        return properties.reduce((obj, prop) => {
            obj[prop] = style(element, prop || "");
            return obj;
        }, {});
    else return style(element, properties || "");
}
