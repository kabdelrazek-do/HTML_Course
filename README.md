# Accessible Portfolio Website

A modern, responsive, and accessible portfolio website built with HTML, CSS, and vanilla JavaScript.

## Features

- **Fully Accessible**: WCAG 2.1 AA compliant with ARIA attributes and keyboard navigation
- **Responsive Design**: Works on all device sizes
- **Performance Optimized**: Fast loading with minimal dependencies
- **Progressive Enhancement**: Works without JavaScript
- **Print Styles**: Print-friendly version of the content
- **Reduced Motion**: Respects user preferences for reduced motion

## Accessibility Features

- Semantic HTML5 elements
- ARIA landmarks and roles
- Keyboard navigation
- Skip links
- Focus management
- High contrast mode support
- Reduced motion support
- Screen reader optimized
- Form validation
- Error handling

## Development

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code, Sublime Text, etc.)
- Node.js (optional, for development tools)

### Project Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # Main styles
├── css/
│   └── accessibility.css # Accessibility-specific styles
├── js/
│   └── main.js         # Main JavaScript file
└── assets/             # Images and other assets
```

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome for Android (latest)

## Testing

### Manual Testing

- [ ] Keyboard navigation
- [ ] Screen reader testing (NVDA, VoiceOver, TalkBack)
- [ ] Color contrast verification
- [ ] Responsive design testing
- [ ] Form validation
- [ ] Print styles

### Automated Testing

Run the following commands to test the website:

```bash
# Install dependencies (if any)
npm install

# Run accessibility audit (requires Node.js)
npx pa11y http://localhost:8000
```

## Deployment

1. Build the project (if needed)
2. Upload files to your web server
3. Test the live site for accessibility and performance

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- [AOS - Animate On Scroll Library](https://michalsnik.github.io/aos/)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Font Awesome Icons](https://fontawesome.com/)

## Contact

For any questions or feedback, please open an issue or contact the maintainer.
