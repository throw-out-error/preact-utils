import { RenderableProps } from "preact";

export interface FlexProps extends Record<string, unknown> {
    direction?: "column" | "row";
    alignItems?: "center";
}

export const Flex = (props: RenderableProps<FlexProps>) => (
    <div
        style={{
            display: "flex",
            flexDirection: props.direction ?? "row",
            alignItems: props.alignItems,
        }}
        {...props}
    ></div>
);
