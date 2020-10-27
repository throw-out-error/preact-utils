import {} from "preact";

export interface ToastData {
    onClose?: () => void;
    title: string;
    description?: string;
    icon?: string;
    style?: Record<string, string | number | boolean>;
    position?: ToastPosition;
}

export type ToastPosition =
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
