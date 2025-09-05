import { config } from '../config'

/**
 * Applies theme colors to CSS custom properties
 * This allows dynamic theme switching based on config
 */
export const applyThemeColors = () => {
  const root = document.documentElement
  
  root.style.setProperty('--color-primary', config.THEME_COLORS.primary)
  root.style.setProperty('--color-primary-hover', config.THEME_COLORS.primaryHover)
  root.style.setProperty('--color-primary-light', config.THEME_COLORS.primaryLight)
  root.style.setProperty('--color-primary-dark', config.THEME_COLORS.primaryDark)
  root.style.setProperty('--color-success', config.THEME_COLORS.success)
  root.style.setProperty('--color-warning', config.THEME_COLORS.warning)
  root.style.setProperty('--color-error', config.THEME_COLORS.error)
  root.style.setProperty('--color-background', config.THEME_COLORS.background)
  root.style.setProperty('--color-surface', config.THEME_COLORS.surface)
  root.style.setProperty('--color-text', config.THEME_COLORS.text)
  root.style.setProperty('--color-text-secondary', config.THEME_COLORS.textSecondary)
  root.style.setProperty('--color-border', config.THEME_COLORS.border)
  root.style.setProperty('--color-shadow', config.THEME_COLORS.shadow)
}

/**
 * Gets a theme color by name
 */
export const getThemeColor = (colorName: keyof typeof config.THEME_COLORS): string => {
  return config.THEME_COLORS[colorName]
}
