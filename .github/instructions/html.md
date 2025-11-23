---
applyTo:
  - "*.html"
  - "index.html"
---

# HTML Guidelines for ARIA ONE

## Semantic HTML
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Use appropriate heading levels (h1-h6) hierarchically
- Avoid using divs when semantic elements are more appropriate

## Accessibility
- Include proper ARIA labels and roles where needed
- Ensure all interactive elements are keyboard accessible
- Use alt text for all images
- Maintain proper heading hierarchy
- Include skip links for keyboard navigation if needed
- Use descriptive link text (avoid "click here")

## Structure
- Keep the HTML clean and well-indented (2 spaces)
- Use meaningful class names that describe the element's purpose
- Group related elements within semantic containers
- Keep inline styles to a minimum (prefer external CSS)

## Meta Tags
- Ensure proper charset (UTF-8)
- Include viewport meta tag for responsive design
- Use descriptive title tags
- Consider adding Open Graph and Twitter Card meta tags for social sharing

## Forms
- Use proper form elements with labels
- Include appropriate input types (email, tel, url, etc.)
- Add placeholder text for guidance
- Include required attributes where appropriate
- Use fieldsets for grouping related form elements

## Performance
- Load scripts at the end of the body or use defer/async
- Preconnect to external domains (e.g., Google Fonts)
- Use appropriate image formats and sizes
- Consider lazy loading for images below the fold

## Comments
- Add HTML comments to mark major sections
- Use comments to explain non-obvious markup choices
- Keep comments concise and relevant
