import { h, RenderableProps, VNode } from "preact";
import "./container.scss";

/**
 * Bootstrap container
 */

export const Container = ({
    children,
}: RenderableProps<Record<string, unknown>>): VNode => (
    <div className="container">{children}</div>
);
