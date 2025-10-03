import { useEffect } from "react";

export const useKey = (key, action) => {
  const handleEscape = (e) => {
    if (e.code?.toLowerCase() === key?.toLowerCase()) {
      action();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [action, key]);
};
