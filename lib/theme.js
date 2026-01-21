// Theme Configuration - Customize your project theme here
// Import this file and use the theme variables throughout your project

export const theme = {
  // Primary Colors
  colors: {
    primary: '#2563eb',      // Blue
    primaryDark: '#1e40af',
    primaryLight: '#3b82f6',
    
    secondary: '#10b981',    // Green
    secondaryDark: '#059669',
    secondaryLight: '#34d399',
    
    danger: '#ef4444',       // Red
    dangerDark: '#dc2626',
    dangerLight: '#f87171',
    
    warning: '#f59e0b',      // Amber
    warningDark: '#d97706',
    warningLight: '#fbbf24',
    
    success: '#10b981',      // Green
    successDark: '#059669',
    successLight: '#6ee7b7',
    
    // Neutral Colors
    white: '#ffffff',
    black: '#000000',
    
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    
    // Background Colors
    background: '#f9fafb',
    backgroundAlt: '#f3f4f6',
    surface: '#ffffff',
    
    // Text Colors
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
      inverse: '#ffffff',
    },
    
    // Border Colors
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    borderDark: '#d1d5db',
  },

  // Spacing (Tailwind scale)
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },

  // Font Sizes
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  // Font Weights
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    base: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },

  // Breakpoints (for responsive design)
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Gradient Combinations
  gradients: {
    primary: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },

  // Z-Index scale
  zIndex: {
    hide: '-1',
    base: '0',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    backdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
  },
};

// Dark Theme (Optional)
export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#111827',
    backgroundAlt: '#1f2937',
    surface: '#1f2937',
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      tertiary: '#9ca3af',
      inverse: '#111827',
    },
    border: '#374151',
    borderLight: '#4b5563',
    borderDark: '#1f2937',
  },
};

// Utility function to get theme value
export const getThemeColor = (path, isDark = false) => {
  const selectedTheme = isDark ? darkTheme : theme;
  const keys = path.split('.');
  let value = selectedTheme;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return null;
  }
  
  return value;
};

// Utility function to generate CSS variables from theme
export const generateCSSVariables = (isDark = false) => {
  const selectedTheme = isDark ? darkTheme : theme;
  const cssVars = {};
  
  const flatten = (obj, prefix = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const varName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null) {
        flatten(value, varName);
      } else {
        cssVars[`--theme-${varName}`] = value;
      }
    }
  };
  
  flatten(selectedTheme.colors);
  return cssVars;
};

export default theme;
