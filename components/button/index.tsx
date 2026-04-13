import React, { ReactNode } from "react";
import styles from "./index.module.css";

interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  variant?: "default" | "blue" | "outline";
  clickHandler?: () => void;
}

export default function Button({
  disabled = false,
  children,
  variant = "default",
  clickHandler,
}: ButtonProps) {
  function renderContent(content: ReactNode) {
    return <span>{content}</span>;
  }

  const handleClick = disabled ? undefined : clickHandler;

  const className = [
    styles.root,
    disabled ? styles.root_disabled : "",
    !disabled && variant === "default" ? styles.root_default : "",
    !disabled && variant === "blue" ? styles.root_blue : "",
    !disabled && variant === "outline" ? styles.root_outline : "",
  ].join(" ");

  return (
    <div className={className} onClick={handleClick}>
      {renderContent(children)}
    </div>
  );
}