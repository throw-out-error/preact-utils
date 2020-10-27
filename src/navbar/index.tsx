import { RenderableProps } from "preact";
import "./nav.scss";

export const Navbar = ({
    children,
    horizontal,
    ...props
}: RenderableProps<{ horizontal?: boolean } & Record<string, unknown>>) => (
    <ul className={`navbar ${!horizontal || "navbar-horizontal"}`} {...props}>
        {children}
    </ul>
);
