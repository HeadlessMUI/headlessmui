import React, { forwardRef, ButtonHTMLAttributes } from "react";

interface HeadlessButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
}

export const HeadlessButton = forwardRef<HTMLButtonElement, HeadlessButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    const variantStyles: Record<string, string> = {
      primary: "var(--md-primary)",
      secondary: "var(--md-secondary)",
      success: "var(--md-success)",
      warning: "var(--md-warning)",
      error: "var(--md-error)",
    };

    const textColor: Record<string, string> = {
      primary: "var(--md-on-primary)",
      secondary: "var(--md-on-secondary)",
      success: "var(--md-on-success)",
      warning: "var(--md-on-warning)",
      error: "var(--md-on-error)",
    };

    const sizeStyles: Record<string, string> = {
      sm: "0.5rem 1rem",
      md: "0.75rem 1.5rem",
      lg: "1rem 2rem",
    };

    return (
      <button
        ref={ref}
        {...props}
        style={{
          backgroundColor: variantStyles[variant],
          color: textColor[variant],
          padding: sizeStyles[size],
          border: `var(--md-border-width) solid ${variantStyles[variant]}`,
          borderRadius: "var(--md-border-radius)",
          fontFamily: "var(--md-text-font-family)",
          fontSize: "var(--md-text-button-font-size)",
          textTransform: "var(--md-text-button-text-transform)",
          cursor: props.disabled ? "not-allowed" : "pointer",
          opacity: props.disabled ? 0.6 : 1,
          outline: "none",
          transition: "all 0.2s ease",
        }}
        className={`headless-button ${className}`}
      >
        {props.children}
        <style jsx>{`
          .headless-button:not(:disabled):hover {
            border-color: var(--md-border-hover);
            filter: brightness(0.95);
          }
          .headless-button:not(:disabled):active {
            filter: brightness(0.9);
          }
          .headless-button:focus-visible {
            outline: var(--md-outline-focus);
            outline-offset: var(--md-outline-offset);
          }
        `}</style>
      </button>
    );
  }
);

HeadlessButton.displayName = "HeadlessButton";