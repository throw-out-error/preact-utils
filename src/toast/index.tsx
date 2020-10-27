import { h, RenderableProps } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Toast } from "./toast";
import { ToastData, ToastPosition } from "./types";

export interface ToastProps {
    toastList: ToastData[];
    position: ToastPosition;
}

export const ToastList = (props: RenderableProps<ToastProps>) => {
    const { toastList, position } = props;
    const [list, setList] = useState(toastList);
    useEffect(() => {
        setList(toastList);
    }, [toastList, list]);

    return (
        <div className={`notification-container ${position}`}>
            {list.map((toast, i) => (
                <Toast key={i} toast={toast} />
            ))}
        </div>
    );
};

export * from "./toast";
export * from "./types";
