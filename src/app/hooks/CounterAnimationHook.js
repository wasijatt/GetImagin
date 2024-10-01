import { useState, useEffect } from "react";
import { gsap } from "gsap";

const useCounterAnimation = (finalValue, duration = 2000) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the counter from 0 to the final value using GSAP
    tl.to({ value: 0 }, {
      value: finalValue,
      duration: duration / 1000, // Convert to seconds for GSAP
      onUpdate: function () {
        setCurrentValue(Math.ceil(this.targets()[0].value));
      },
      ease: "power3.out",
    });

    return () => {
      tl.kill(); // Clean up GSAP timeline on unmount
    };
  }, [finalValue, duration]);

  return currentValue;
};

export default useCounterAnimation;
