import React, { Dispatch } from "react";
import { Notification, ToastActions } from "./ToastReducer";

interface Props {
  notif: Notification;
  dispatch: Dispatch<ToastActions>;
}
export const ToastNotification: React.FC<Props> = ({ notif, dispatch }) => {
  if (notif.timer) {
    setTimeout(() => {
      dispatch({ type: "REMOVE", payload: { id: notif.id } });
    }, notif.timer);
  }

  return (
    <li
      key={notif.id}
      className={`rounded-md
      py-1
      px-3 
      text-white
      ${
        notif.type === "ERROR"
          ? "bg-red-800"
          : notif.type === "SUCCESS"
          ? "bg-emerald-700"
          : "bg-orange-500"
      } `}
    >
      <div className="flex justify-between">
        <p className="text-lg font-bold"> {notif.type} </p>
        <button
          className="close-toast-notif-btn text-lg font-bold "
          aria-label="Dismiss notification"
          onClick={() =>
            dispatch({ type: "REMOVE", payload: { id: notif.id } })
          }
        >
          X
        </button>
      </div>

      <p> {notif.text} </p>
    </li>
  );
};
