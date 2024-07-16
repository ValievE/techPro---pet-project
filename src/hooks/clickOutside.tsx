import { useEffect, useRef } from "react";

export const useOutsideClick = (onOutsideClick: CallableFunction) => {
  const ref = useRef<HTMLButtonElement | HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onOutsideClick]);

  return ref;
};
