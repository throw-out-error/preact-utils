import { h, Component, render } from "preact";

export interface PortalProps {
    into: HTMLElement | string;
}

/** Redirect rendering of descendants into the given CSS selector.
 *  @example
 *    <Portal into="body">
 *      <div>I am rendered into document.body</div>
 *    </Portal>
 */
export class Portal extends Component<PortalProps> {
    isMounted: boolean;
    remote: HTMLElement;
    intoPointer: HTMLElement | string;
    into: HTMLElement;

    componentDidUpdate(props): number {
        for (const i in props)
            if (props[i] !== this.props[i]) return setTimeout(this.renderLayer);
    }

    componentDidMount(): void {
        this.isMounted = true;
        this.renderLayer = this.renderLayer.bind(this);
        this.renderLayer();
    }

    componentWillUnmount(): void {
        this.renderLayer(false);
        this.isMounted = false;
        if (this.remote && this.remote.parentNode)
            this.remote.parentNode.removeChild(this.remote);
    }

    findNode(node: HTMLElement | string): HTMLElement {
        return typeof node === "string" ? document.querySelector(node) : node;
    }

    renderLayer(show = true): void {
        if (!this.isMounted) return;

        // clean up old node if moving bases:
        if (this.props.into !== this.intoPointer) {
            this.intoPointer = this.props.into;
            if (this.into && this.remote)
                render(<PortalProxy />, this.into, this.remote);

            this.into = this.findNode(this.props.into);
        }

        render(
            <PortalProxy context={this.context}>
                {(show && this.props.children) || null}
            </PortalProxy>,
            this.into,
            this.remote
        );
    }

    render(): null {
        return null;
    }
}

// high-order component that renders its first child if it exists.
// used as a conditional rendering proxy.
class PortalProxy extends Component<{ context?: unknown }> {
    getChildContext() {
        return this.props.context as never;
    }

    render({ children }) {
        return (children && children[0]) || null;
    }
}
