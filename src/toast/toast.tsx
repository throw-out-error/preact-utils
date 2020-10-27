import { RenderableProps } from "preact";
import { ToastData } from "./types";

export const Toast = ({ toast }: RenderableProps<{ toast: ToastData }>) => {
    return (
        <div
            className={`notification toast ${toast.position}`}
            style={toast.style}
        >
            <button onClick={toast.onClose}>X</button>
            {!toast.icon || (
                <div className="notification-image">
                    <img src={toast.icon} alt="" />
                </div>
            )}
            <div>
                <p className="notification-title">
                    {toast.title ?? "Untitled Toast"}
                </p>
                <p className="notification-message">{toast.description}</p>
            </div>
        </div>
    );
};
