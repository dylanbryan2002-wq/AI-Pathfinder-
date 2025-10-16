// AI Pathfinder Design System
// Based on UI screenshots and brand guidelines

export const theme = {
  colors: {
    // Primary Brand Colors
    primary: {
      green: '#7CFC00',      // Super bright lime green from logo (ai)
      blue: '#00BFFF',       // Deep sky blue from logo (finder)
      gradient: 'linear-gradient(90deg, #7CFC00 0%, #00E5CC 50%, #00BFFF 100%)',
    },

    // Secondary Colors
    secondary: {
      lightBlue: '#00D9FF',
      darkBlue: '#0052FF',
      purple: '#8B5CF6',
      teal: '#14B8A6',
    },

    // UI Colors
    background: {
      primary: '#F5F5F7',    // Light gray background
      secondary: '#FFFFFF',   // White
      card: '#FFFFFF',        // White cards
      overlay: 'rgba(0, 0, 0, 0.5)',
    },

    // Text Colors
    text: {
      primary: '#000000',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      white: '#FFFFFF',
    },

    // Button Colors
    button: {
      try: '#5DD9FC',        // Light blue "Try" button
      commit: '#0052FF',     // Dark blue "Commit" button
      commitGradient: 'linear-gradient(90deg, #7FE7A8 0%, #4FA4FE 100%)',
    },

    // Status Colors
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },

    // Match Percentage Colors
    match: {
      high: '#10B981',       // 90%+ match (green)
      medium: '#F59E0B',     // 70-89% match (orange)
      low: '#6B7280',        // <70% match (gray)
    },

    // Gradients for psychometric cards
    gradients: {
      personality: 'linear-gradient(135deg, #EF4444 0%, #8B5CF6 100%)',  // Red to purple
      skills: 'linear-gradient(135deg, #14B8A6 0%, #FBBF24 100%)',        // Teal to yellow
      goals: 'linear-gradient(135deg, #93C5FD 0%, #7FE7A8 100%)',         // Light blue to green
      values: 'linear-gradient(135deg, #8B5CF6 0%, #14B8A6 100%)',        // Purple to teal
      interest: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',      // Blue to purple
      beliefs: 'linear-gradient(135deg, #FBBF24 0%, #F472B6 100%)',       // Yellow to pink
    },

    // Voice Mode
    voice: {
      blob: '#7CFC00',       // Super bright lime green animated blob
      active: '#00BFFF',     // Deep sky blue when speaking
      inactive: '#E5E7EB',   // Gray when inactive
    },

    // Navigation
    nav: {
      active: '#000000',
      inactive: '#9CA3AF',
      glow: 'radial-gradient(circle, rgba(124, 252, 0, 1) 0%, rgba(0, 229, 204, 0.9) 50%, rgba(0, 191, 255, 1) 100%)',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },

  // Border Radius
  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',  // Fully rounded
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },

  // Breakpoints for responsive design
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },

  // Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    overlay: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
};

export type Theme = typeof theme;
