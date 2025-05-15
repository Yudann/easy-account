"use client";

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonType, ButtonVariant } from "./button.enum";
import { ButtonProps } from "./button.type";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      disabled,
      type = ButtonType.BUTTON,
      block = false,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const generateVariant = () => {
      switch (variant) {
        case ButtonVariant.PRIMARY:
          return "bg-[#007bff] text-white";
        case ButtonVariant.SECONDARY:
          return "bg-[#3C3D3E] text-white";
        case ButtonVariant.SUCCESS:
          return "bg-[#28a745] text-white";
        case ButtonVariant.DANGER:
          return "bg-red-500 text-white hover:bg-red-riors transition-bg duration-200";
        case ButtonVariant.WARNING:
          return "bg-[#ffc107]";
        case ButtonVariant.INFO:
          return "bg-[#17a2b8] text-white";
        case ButtonVariant.DARK:
          return "bg-blackout text-white hover:bg-blackout transition-bg duration-300";
        case ButtonVariant.PINK:
          return "bg-punk-pink text-white";
        case ButtonVariant.TRANSPARENT:
          return "bg-transparent";
        default:
          return "";
      }
    };

    const generateSize = () => {
      switch (size) {
        case "sm":
          return "p-2 text-sm";
        case "lg":
          return "px-4 py-2 text-xl";
        default:
          return "px-3 py-1.5";
      }
    };

    return (
      <button
        type={type}
        className={twMerge(
          `
        rounded
        font-semibold
        cursor-pointer
        ${block ? "w-full" : ""}
        ${generateVariant()}
        ${generateSize()}
        `,
          disabled && "opacity-75 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
