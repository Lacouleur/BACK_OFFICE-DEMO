import { useEffect } from "react";
/**
 * Hook that alerts clicks outside of the passed ref
 */
function useClickOutside(ref, callback) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  }
  function handlePressEscape(event) {
    if (event.defaultPrevented) {
      return;
    }
    const key = event.key || event.keyCode;
    if (key === "Escape" || key === "Esc" || key === 27) {
      callback();
    }
  }
  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keyup", handlePressEscape);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("keyup", handlePressEscape);
    };
  });
}

export default useClickOutside;
