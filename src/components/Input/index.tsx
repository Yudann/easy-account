"use client";

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { InputProps } from "./input.type";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, block, inputSize, isError, ...props }, ref) => {
    const generateSize = () => {
      switch (inputSize) {
        case "sm":
          return "px-2 py-1 text-[0.875rem] leading-normal";
        case "lg":
          return "px-4 py-2 text-[1.25rem] leading-normal";
        default:
          return "px-3 py-1.5 text-[1rem] leading-normal";
      }
    };
    return (
      <input
        className={twMerge(
          isError
            ? "focus:border-red-700 border-red-500 outline-red-700 focus:shadow-[0_0_5px_0_#ad4040]"
            : "focus:border-riors-black-hover border-gray-300 outline-riors-black focus:shadow-[0_0_5px_0_#3c3d3e]",
          `w-full transition-[border-color,box-shadow] rounded border font-medium outline-0 delay-0 duration-150 ease-in-out  ${
            block && "w-full"
          } ${generateSize()}`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
