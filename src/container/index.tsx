import { h, RenderableProps, VNode } from "preact";
import "./container.scss";

/**
 * Bootstrap container
 */

export const Container = ({
    children,
    ...props
}: RenderableProps<Record<string, unknown>>): VNode => (
    <div className="container" {...props}>
        {children}
    </div>
);
