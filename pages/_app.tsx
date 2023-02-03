import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastDisplay } from "../components/Toast/Toast";
import { createContext, Dispatch, useReducer } from "react";
import { ToastActions, toastReducer } from "../components/Toast/ToastReducer";

interface IToastContext {
  dispatch: Dispatch<ToastActions>;
}

export const ToastContext = createContext<IToastContext>({} as IToastContext);
export default function App({ Component, pageProps }: AppProps) {
  const [toastNotifications, toastDispatch] = useReducer(toastReducer, []);
  return (
    <>
      <ToastContext.Provider value={{ dispatch: toastDispatch }}>
        <ToastDisplay
          dispatch={toastDispatch}
          notifications={toastNotifications}
          maxNotifications={3}
        />
        <Component {...pageProps} />
      </ToastContext.Provider>
    </>
  );
}
