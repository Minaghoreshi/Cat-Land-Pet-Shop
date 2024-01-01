import { Toast } from "flowbite-react";
import { useEffect, useState } from "react";

export const Toastify = ({ text, color }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    isVisible && (
      <Toast className={`flex ${color} animate-slideInDown absolute top-10`}>
        <div className="ml-3 text-xl font-normal text-white">{text}</div>
      </Toast>
    )
  );
};
