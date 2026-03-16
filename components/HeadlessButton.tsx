'use client'

import { useState, useRef, useEffect, type ElementType, type Ref } from 'react'

let DEFAULT_BUTTON_TAG = 'button' as const

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> extends React.ComponentPropsWithoutRef<TTag> {
  disabled?: boolean
  autoFocus?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  as?: TTag
  style?: React.CSSProperties
}

export function Button<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  {
    as,
    disabled = false,
    autoFocus = false,
    variant = 'primary',
    size = 'md',
    style,
    children,
    ...props
  }: ButtonProps<TTag>,
  ref: Ref<HTMLElement>
) {
  const Tag = as || DEFAULT_BUTTON_TAG
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const [active, setActive] = useState(false)
  const internalRef = useRef<HTMLElement>(null)

  // autoFocus effect
  useEffect(() => {
    if (autoFocus && internalRef.current) {
      internalRef.current.focus()
    }
  }, [autoFocus])

  const handleMouseEnter = () => !disabled && setHover(true)
  const handleMouseLeave = () => {
    setHover(false)
    setActive(false)
  }
  const handleMouseDown = () => !disabled && setActive(true)
  const handleMouseUp = () => setActive(false)
  const handleFocus = () => !disabled && setFocus(true)
  const handleBlur = () => setFocus(false)

  // Sizes
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: '0.25rem 0.5rem', fontSize: '0.75rem' },
    md: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    lg: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
  }

  // Variants
  const variantColors: Record<ButtonVariant, { bg: string; bgHover: string; bgActive: string; color: string; border: string }> = {
    primary: {
      bg: 'var(--md-primary)',
      bgHover: 'var(--md-primary-light)',
      bgActive: 'var(--md-primary-dark)',
      color: 'var(--md-on-primary)',
      border: 'var(--md-border-primary)',
    },
    secondary: {
      bg: 'var(--md-secondary)',
      bgHover: 'var(--md-secondary-light)',
      bgActive: 'var(--md-secondary-dark)',
      color: 'var(--md-on-secondary)',
      border: 'var(--md-border-secondary)',
    },
    success: {
      bg: 'var(--md-success)',
      bgHover: 'var(--md-success-light)',
      bgActive: 'var(--md-success-dark)',
      color: 'var(--md-on-success)',
      border: 'var(--md-border-success)',
    },
    warning: {
      bg: 'var(--md-warning)',
      bgHover: 'var(--md-warning-light)',
      bgActive: 'var(--md-warning-dark)',
      color: 'var(--md-on-warning)',
      border: 'var(--md-border-warning)',
    },
    error: {
      bg: 'var(--md-error)',
      bgHover: 'var(--md-error-light)',
      bgActive: 'var(--md-error-dark)',
      color: 'var(--md-on-error)',
      border: 'var(--md-border-danger)',
    },
  }

  const colors = variantColors[variant] || variantColors['primary']
  const combinedStyle: React.CSSProperties = {
    backgroundColor: disabled ? 'var(--md-base-200)' : active ? colors.bgActive : hover ? colors.bgHover : colors.bg,
    color: disabled ? 'var(--md-text-disabled-color)' : colors.color,
    border: focus ? 'var(--md-border-focus)' : colors.border,
    borderRadius: 'var(--md-border-radius)',
    boxShadow: focus ? 'var(--md-elevation-2)' : active ? 'var(--md-elevation-1)' : 'var(--md-elevation-0)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    ...sizeStyles[size],
    ...style,
  }

  return (
    <Tag
      ref={(node) => {
        internalRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node
      }}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
	  className="hlm-button"
      style={combinedStyle}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Button