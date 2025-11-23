---
applyTo:
  - "*.js"
  - "Script.js"
---

# JavaScript Guidelines for ARIA ONE

## Modern JavaScript
- Use ES6+ features (const/let, arrow functions, template literals, destructuring)
- Avoid var declarations
- Use const by default, let only when reassignment is needed
- Prefer arrow functions for callbacks and short functions

## Code Organization
- Use the DOM Content Loaded event to ensure DOM is ready
- Group related functionality together
- Use descriptive function names that indicate what they do
- Keep functions small and focused (single responsibility)

## DOM Manipulation
- Cache DOM queries in variables when used multiple times
- Use querySelector/querySelectorAll for selecting elements
- Prefer classList methods over direct className manipulation
- Use event delegation for better performance when applicable

## Event Handling
- Use addEventListener instead of inline event handlers
- Remove event listeners when no longer needed to prevent memory leaks
- Use event delegation for dynamically created elements
- Prevent default behavior explicitly when needed

## Code Style
- Use 2-space indentation
- Use semicolons consistently
- Use template literals for string interpolation
- Use single quotes for strings (or be consistent with the existing code)
- Add spaces around operators and after keywords

## Comments
- Add comments to explain complex logic or non-obvious code
- Use JSDoc-style comments for functions that are reusable
- Keep comments up to date with code changes
- Avoid obvious comments that just restate what the code does

## Performance
- Debounce or throttle expensive operations (scroll, resize handlers)
- Minimize DOM reflows and repaints
- Use requestAnimationFrame for animations
- Avoid unnecessary array iterations

## Error Handling
- Add error handling for async operations
- Validate user inputs
- Handle edge cases gracefully
- Log errors to console for debugging

## Best Practices
- No global variables unless necessary
- Use meaningful variable names
- Keep code DRY (Don't Repeat Yourself)
- Test in multiple browsers if making significant changes
- Ensure code works without a build step (no transpilation needed)

## Vanilla JavaScript
- Do not add framework dependencies (React, Vue, Angular, etc.)
- Avoid jQuery - use vanilla JavaScript equivalents
- Keep the project lightweight and framework-free
- Use native browser APIs whenever possible
