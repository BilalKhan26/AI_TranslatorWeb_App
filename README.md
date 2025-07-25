# AI Translator - Modern Translation Tool

A beautiful, modern web-based translation application that works entirely in the browser. Built with vanilla HTML, CSS, and JavaScript for easy deployment on GitHub Pages.

![AI Translator](https://img.shields.io/badge/Status-Ready%20for%20Deployment-brightgreen)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **🌍 Multi-language Support**: Translate between 13+ popular languages
- **🎨 Modern Design**: Beautiful gradient backgrounds with smooth animations
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **⚡ Real-time Translation**: Auto-translate as you type with smart debouncing
- **🔄 Language Swapping**: Easily swap source and target languages
- **📋 Copy to Clipboard**: One-click copying of translations
- **⌨️ Keyboard Shortcuts**: Efficient keyboard navigation
- **🎯 Auto-detect Language**: Automatically detect the source language
- **💫 Loading States**: Smooth loading animations and error handling
- **🚀 No Backend Required**: Runs entirely in the browser

## 🚀 Live Demo

Visit the live application: [Your GitHub Pages URL will be here]

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript (ES6+)**: Vanilla JavaScript with async/await
- **Font Awesome**: Beautiful icons
- **Google Fonts**: Inter font family for modern typography
- **Translation APIs**: MyMemory and LibreTranslate APIs

## 📦 Installation & Deployment

### Deploy to GitHub Pages

1. **Fork this repository** or create a new repository
2. **Upload the files** to your repository:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your site**:
   - Your site will be available at: `https://yourusername.github.io/repository-name`
   - It may take a few minutes to deploy

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ai-translator.git
   cd ai-translator
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access locally**:
   - Open `http://localhost:8000` in your browser

## 🎯 Usage

1. **Select Languages**: Choose source and target languages from the dropdowns
2. **Enter Text**: Type or paste text in the input area
3. **Translate**: Click the translate button or use Ctrl+Enter
4. **Copy Result**: Click the copy button to copy the translation
5. **Swap Languages**: Use the swap button to reverse translation direction

### Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Translate text
- `Ctrl/Cmd + K`: Clear input
- `Ctrl/Cmd + C`: Copy translation (when focused on output)

## 🔧 Configuration

### Adding More Languages

To add more languages, edit the `languageNames` object in `script.js`:

```javascript
const languageNames = {
    'auto': 'Auto-detect',
    'en': 'English',
    'es': 'Spanish',
    // Add more languages here
    'your_lang_code': 'Your Language Name'
};
```

Then add the corresponding options to the select elements in `index.html`.

### Customizing Appearance

- **Colors**: Modify the CSS custom properties in `styles.css`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Layout**: Adjust the grid and flexbox properties in `styles.css`

## 🌐 Translation APIs

This application uses multiple translation APIs for reliability:

1. **MyMemory API** (Primary): Free translation API with no API key required
2. **LibreTranslate API** (Fallback): Open-source translation service
3. **Demo Mode** (Final fallback): Mock translations for demonstration

### API Limitations

- **Rate Limits**: Free APIs have usage limits
- **Language Pairs**: Not all language combinations are supported
- **Quality**: Translation quality may vary between APIs

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Test on multiple browsers and devices
- Ensure responsive design works properly
- Add comments for complex functionality

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues

- Some language pairs may not be available in all APIs
- Translation quality depends on the source API
- Rate limiting may occur with heavy usage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MyMemory API](https://mymemory.translated.net/) for free translation services
- [LibreTranslate](https://libretranslate.com/) for open-source translation
- [Font Awesome](https://fontawesome.com/) for beautiful icons
- [Google Fonts](https://fonts.google.com/) for typography

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/ai-translator/issues) page
2. Create a new issue with detailed information
3. Include browser version and steps to reproduce

---

**Made with ❤️ for the open-source community**

*Ready for deployment on GitHub Pages! 🚀*