import { Component, VNode } from "preact";
import { Portal } from "../portal";

export class HeadTag extends Component<{ tag: string }, { isClient: boolean }> {
    componentDidMount() {
        this.setState({ isClient: true });

        const ssrTag = document.head.querySelector("[data-pht]");
        if (ssrTag) ssrTag.remove();
    }

    render({ tag: Tag, ...rest }, { isClient }) {
        if (isClient)
            return (
                <Portal into="head">
                    <Tag {...rest} />
                </Portal>
            );

        if (this.context.head)
            this.context.head.add(<Tag data-pht {...rest} />);
    }
}

export const Title = (props: Record<string, unknown>) => (
    <HeadTag tag="title" {...props} />
);
export const Style = (props: Record<string, unknown>) => (
    <HeadTag tag="style" {...props} />
);
export const Meta = (props: Record<string, unknown>) => (
    <HeadTag tag="meta" {...props} />
);
export const Link = (...props: unknown[]) => <HeadTag tag="link" {...props} />;
