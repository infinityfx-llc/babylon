'use client';

import styles from './toast.module.css';
import { Toast } from "@infinityfx/fluid";
import { createContext, useContext, useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom";
import { Animatable } from '@infinityfx/lively';
import { LayoutGroup } from '@infinityfx/lively/layout';

type ToastProps = {
    title: string;
    color: string;
    icon: React.ReactNode;
    content?: React.ReactNode;
    onClose?: () => void;
    lifetime?: number;
    timestamp?: string;
}

const ToastContext = createContext<null | {
    notify: (options: ToastProps) => void;
}>(null);

export function ToastProvider({ children }: { children: React.ReactNode; }) {
    const [mounted, setMounted] = useState(false);
    const toasts = useRef<ToastProps[]>([]);
    const [state, setState] = useState<ToastProps[]>([]);

    function notify({ lifetime, ...options }: ToastProps) {
        options.timestamp = Date.now().toString();

        setTimeout(() => {
            const i = toasts.current.findIndex(toast => toast.timestamp === options.timestamp);

            if (i >= 0) {
                toasts.current.splice(i, 1);
                setState(toasts.current.slice());
            }
        }, (lifetime || 4) * 1000);

        toasts.current.push(options);
        setState(toasts.current.slice());
    }

    useEffect(() => setMounted(true), []);

    return <ToastContext.Provider value={{ notify }}>
        {mounted && createPortal(<div className={styles.toasts}>
            <LayoutGroup transition={{ duration: .3 }}>
                {state.map(({ content, timestamp, ...toast }, i) => {

                    return <Animatable
                        key={timestamp}
                        id={timestamp}
                        adaptive
                        animations={{
                            mount: { opacity: [0, 1], translate: ['0% 50%', '0% 0%'], duration: .3 },
                            unmount: { opacity: [1, 0], scale: [1, 0.85], duration: .2 }
                        }}
                        triggers={[
                            { on: 'mount', name: 'mount' },
                            { on: 'unmount', name: 'unmount' }
                        ]}>
                        <Toast {...toast} onClose={() => {
                            toast.onClose?.();

                            toasts.current.splice(i, 1);
                            setState(toasts.current.slice());
                        }}>
                            {content}
                        </Toast>
                    </Animatable>;
                })}
            </LayoutGroup>
        </div>, document.getElementById('__fluid') as HTMLElement)}

        {children}
    </ToastContext.Provider>;
}

export function useToast() {
    const toastContext = useContext(ToastContext);

    if (!toastContext) throw new Error('Unable to access ToastContext');

    return toastContext.notify;
}