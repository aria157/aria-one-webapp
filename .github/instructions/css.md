---
applyTo:
  - "*.css"
  - "Style.css"
---

# CSS Guidelines for ARIA ONE

**Note**: The primary CSS is currently defined inline within `index.html` (lines 33-561). The external `Style.css` file appears to contain legacy code. When making CSS changes, work with the inline styles in `index.html` unless specifically refactoring to use external stylesheets.

## Design System
Use the CSS variables defined in `:root` for consistency:
- `--bg`: #050507 (primary background)
- `--bg-alt`: #0b0d12 (secondary background)
- `--accent`: #f7ff3a (neon yellow accent)
- `--text-main`: #ffffff (primary text)
- `--text-soft`: #c6cad6 (secondary text)
- `--border-soft`: #2a2f3c (borders)
- `--font-main`: Montserrat font family

## Styling Principles
- Maintain the dark theme with neon yellow accents
- Keep the futuristic, professional aesthetic
- Ensure consistency with existing design patterns
- Use the defined color palette exclusively

## Code Organization
- Group related styles together
- Use comments to separate major sections
- Order properties logically (positioning, box model, typography, visual)
- Keep selectors simple and maintainable

## Responsive Design
- Design mobile-first, then add desktop enhancements
- Use relative units (rem, em, %, vh/vw) over fixed pixels where appropriate
- Test layouts at common breakpoints (mobile, tablet, desktop)
- Ensure touch targets are at least 44x44px for mobile
- Use CSS Grid and Flexbox for layouts

## CSS Best Practices
- Use CSS variables for repeated values
- Avoid !important unless absolutely necessary
- Use shorthand properties when appropriate
- Minimize specificity wars (keep selectors simple)
- Prefer classes over IDs for styling

## Naming Conventions
- Use meaningful, descriptive class names
- Use kebab-case for class names (e.g., `.tab-button`)
- Avoid presentational class names (prefer semantic names)
- Use BEM-like naming for complex components if needed

## Performance
- Minimize use of expensive properties (box-shadow, filter, etc.)
- Avoid excessive nesting
- Use will-change sparingly and remove after animation
- Optimize animations to use transform and opacity

## Animations and Transitions
- Use transitions for smooth state changes
- Keep animations subtle and purposeful
- Use CSS animations over JavaScript when possible
- Respect prefers-reduced-motion for accessibility

## Browser Compatibility
- Use standard CSS properties that work across modern browsers
- Add vendor prefixes only if needed for older browser support
- Test in major browsers (Chrome, Firefox, Safari, Edge)
- Use fallbacks for newer CSS features if needed

## Accessibility
- Ensure sufficient color contrast (especially with the dark theme)
- Don't rely on color alone to convey information
- Ensure focus states are visible for keyboard navigation
- Use rem units for font sizes (respects user preferences)
- Avoid content that flashes or strobes

## Typography
- Use the Montserrat font family consistently
- Maintain readable font sizes (minimum 16px / 1rem for body text)
- Use appropriate line-height for readability (1.5-1.6 for body text)
- Limit line length for optimal readability (50-75 characters)

## Comments
- Use comments to explain complex CSS or non-obvious choices
- Mark major sections with clear comment headers
- Keep comments up to date with style changes
