import { useRef, useEffect } from "react";

export let useClickOutside = (handler: any) => {
  let domNode = useRef<any>();

  useEffect(() => {
    let maybeHandler = (e: { target: any }) => {
      try {
        if (!domNode.current.contains(e.target)) {
          handler();
        }
      } catch {
        return;
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};
