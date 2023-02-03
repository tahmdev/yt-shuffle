import React, { Dispatch } from "react";
import { ToastNotification } from "./ToastNotification";
import { Notification, ToastActions } from "./ToastReducer";

interface Props {
  notifications: Notification[];
  dispatch: Dispatch<ToastActions>;
  maxNotifications: number;
}
export const ToastDisplay: React.FC<Props> = ({
  notifications,
  dispatch,
  maxNotifications,
}) => {
  return (
    <div className="fixed bottom-5 right-5 w-3/4 max-w-lg">
      <ul className="flex flex-col gap-4">
        {[...notifications]
          .reverse()
          .slice(0, maxNotifications)
          .map((notification) => {
            return (
              <ToastNotification
                key={notification.id}
                notif={notification}
                dispatch={dispatch}
              />
            );
          })}
      </ul>
    </div>
  );
};
