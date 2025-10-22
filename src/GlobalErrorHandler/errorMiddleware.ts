import type { Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const errorMiddleware: Middleware = () => (next) => (action: any) => {
  if (action.type.endsWith("rejected") && !action.meta?.rejectedWithValue) {
    const errorMessage =
      action.payload?.data?.message ||
      action.error?.message ||
      "Something went wrong.";

    toast.error(errorMessage);
  }

  return next(action);
};
