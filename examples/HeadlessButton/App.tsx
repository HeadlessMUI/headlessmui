'use client'

import { useState } from 'react'
import Button from './HeadlessButton'
import './App.css' // Import your CSS variables

export default function ButtonDemo() {
  const [darkMode, setDarkMode] = useState(true)

  // Simple icons for demo
  const icons = {
    default: '⭐',
    primary: '🚀',
    secondary: '⚡',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  }

  return (
    <div
      style={{
        backgroundColor: darkMode ? 'var(--md-base-900)' : 'var(--md-base-50)',
        color: darkMode ? 'var(--md-on-base-darker)' : 'var(--md-on-base)',
        minHeight: '100vh',
        padding: '2rem',
        transition: 'all 0.3s ease',
        fontFamily: 'var(--md-text-font-family)',
      }}
    >
      {/* Dark / Light Mode Switch */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          Dark Mode
        </label>
      </div>

      {/* Filled Buttons */}
      <h2>Filled Buttons</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <Button>Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="error">Error</Button>
      </div>

      {/* Outlined Buttons */}
      <h2>Outlined Buttons</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <Button style={{ backgroundColor: 'transparent', border: 'var(--md-border-base)', color: darkMode ? 'var(--md-on-base-darker)' : 'var(--md-on-base)' }}>Default</Button>
        <Button variant="primary" style={{ backgroundColor: 'transparent', border: 'var(--md-border-primary)', color: 'var(--md-primary)' }}>Primary</Button>
        <Button variant="secondary" style={{ backgroundColor: 'transparent', border: 'var(--md-border-secondary)', color: 'var(--md-secondary)' }}>Secondary</Button>
        <Button variant="success" style={{ backgroundColor: 'transparent', border: 'var(--md-border-success)', color: 'var(--md-success)' }}>Success</Button>
        <Button variant="warning" style={{ backgroundColor: 'transparent', border: 'var(--md-border-warning)', color: 'var(--md-warning)' }}>Warning</Button>
        <Button variant="error" style={{ backgroundColor: 'transparent', border: 'var(--md-border-danger)', color: 'var(--md-error)' }}>Error</Button>
      </div>

      {/* Buttons with Icons */}
      <h2>Buttons with Icons</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <Button>{icons.default} Default</Button>
        <Button variant="primary">{icons.primary} Primary</Button>
        <Button variant="secondary">{icons.secondary} Secondary</Button>
        <Button variant="success">{icons.success} Success</Button>
        <Button variant="warning">{icons.warning} Warning</Button>
        <Button variant="error">{icons.error} Error</Button>
      </div>
    </div>
  )
}