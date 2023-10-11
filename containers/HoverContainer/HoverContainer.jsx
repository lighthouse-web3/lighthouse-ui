import React, { useEffect } from "react";
import styles from "./HoverContainer.module.scss";
import Image from "next/image";
function HoverContainer() {
  let mouseX = 0;
  let mouseY = 0;
  let flashlight = React.useRef(null);

  // Detect touch device
  const isTouchDevice = () => {
    try {
      // We try to create TouchEvent (it would fail for desktops and throw error)
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  };

  const getMousePosition = (e) => {
    try {
      // Get position of mouse or touch
      mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
      mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY;

      // Set the Xpos and Ypos variables to current mouse/touch position
      flashlight.current.style.setProperty("--Xpos", mouseX + "px");
      flashlight.current.style.setProperty("--Ypos", mouseY + "px");
    } catch (e) {}
  };

  useEffect(() => {
    // Update mouse position on mouse move / touch move
    document.addEventListener("mousemove", getMousePosition);
    document.addEventListener("touchmove", getMousePosition);

    return () => {
      // Clean up event listeners on component unmount
      document.removeEventListener("mousemove", getMousePosition);
      document.removeEventListener("touchmove", getMousePosition);
    };
  }, []);

  return <div ref={flashlight} className={styles.flashlight}></div>;
}

export default HoverContainer;
