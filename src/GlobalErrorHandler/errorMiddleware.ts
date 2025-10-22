
import type { Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const errorMiddleware: Middleware = () => (next) => (action:any) => {

  if (action.type.endsWith("rejected")) {
    const errorMessage =
      action.payload?.status ||
      action.error?.message ||
      "Something went wrong.";

    toast.error(errorMessage);

  }

  return next(action);
};
