import React, { Dispatch } from "react";
import { Notification, ToastActions } from "./ToastReducer";

interface Props {
  notification: Notification;
  dispatch: Dispatch<ToastActions>;
  autoRemove?: number;
}
export const ToastNotification: React.FC<Props> = ({
  notification,
  dispatch,
  autoRemove,
}) => {
  if (autoRemove) {
    setTimeout(() => {
      dispatch({ type: "REMOVE", payload: { id: notification.id } });
    }, autoRemove);
  }

  return (
    <li
      key={notification.id}
      className={`toast-notif toast-notif--${notification.type}`}
    >
      <button
        className="close-toast-notif-btn"
        aria-label="Dismiss notification"
        onClick={() =>
          dispatch({ type: "REMOVE", payload: { id: notification.id } })
        }
      >
        X
      </button>
      <p> {notification.text} </p>
    </li>
  );
};
