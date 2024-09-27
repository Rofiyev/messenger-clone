"use client";

import { HashLoader } from "react-spinners";

const LoadingModal = () => {
  return (
    <div
      className="
      min-h-screen
      w-full
      fixed
      inset-0
      bg-gray-100
      bg-opacity-50
      transition-opacity
      z-20
      "
    >
      <div
        className="
        fixed
        inset-0
        z-10
        overflow-y-auto
        "
      >
        <div
          className="
          flex
          min-h-full
          items-center
          justify-center
          p-4
          text-center
          "
        >
          <HashLoader size={50} color="#0284c7" />
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
