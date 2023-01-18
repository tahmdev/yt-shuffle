import React, { Dispatch } from "react";
import { ToastNotification } from "./ToastNotification";
import { Notification, ToastActions } from "./ToastReducer";

interface Props {
  notifications: Notification[];
  dispatch: Dispatch<ToastActions>;
  autoRemove?: number;
}
export const ToastDisplay: React.FC<Props> = ({
  notifications,
  dispatch,
  autoRemove,
}) => {
  return (
    <div className="toast-wrapper">
      <ul>
        {notifications.map((notification) => {
          return (
            <ToastNotification
              notification={notification}
              dispatch={dispatch}
              autoRemove={autoRemove}
            />
          );
        })}
      </ul>
    </div>
  );
};
