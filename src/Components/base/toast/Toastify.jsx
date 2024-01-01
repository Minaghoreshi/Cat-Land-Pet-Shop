import { Toast } from "flowbite-react";
import { useEffect, useState } from "react";

export const Toastify = ({ text, color, position }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    isVisible && (
      <Toast className={`flex ${color} absolute ${position}`}>
        <div className="flex ml-3 w-auto text-xl font-normal text-white">
          {text}
        </div>
      </Toast>
    )
  );
};
