// Language mappings for the translation API
const languageNames = {
    'auto': 'Auto-detect',
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
    'ar': 'Arabic',
    'hi': 'Hindi',
    'ur': 'Urdu'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const inputText = document.getElementById('inputText');
    const translateBtn = document.getElementById('translateBtn');
    const charCount = document.querySelector('.char-count');

    // Update character count
    inputText.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = `${count} / 5000`;
        
        // Enable/disable translate button
        translateBtn.disabled = count === 0;
        
        // Auto-translate on input (with debounce)
        clearTimeout(window.translateTimeout);
        if (count > 0) {
            window.translateTimeout = setTimeout(() => {
                translateText();
            }, 1000);
        } else {
            clearOutput();
        }
    });

    // Enable translate button on Enter key
    inputText.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            translateText();
        }
    });

    // Initialize with disabled translate button
    translateBtn.disabled = true;
}

async function translateText() {
    const inputText = document.getElementById('inputText').value.trim();
    const sourceLanguage = document.getElementById('sourceLanguage').value;
    const targetLanguage = document.getElementById('targetLanguage').value;
    const outputElement = document.getElementById('outputText');
    const translateBtn = document.getElementById('translateBtn');

    if (!inputText) {
        showError('Please enter text to translate');
        return;
    }

    if (sourceLanguage === targetLanguage && sourceLanguage !== 'auto') {
        showError('Source and target languages cannot be the same');
        return;
    }

    // Show loading state
    showLoading(true);
    translateBtn.disabled = true;
    outputElement.innerHTML = '<div class="placeholder"><i class="fas fa-spinner fa-spin"></i> Translating...</div>';

    try {
        // Use MyMemory Translation API (free, no API key required)
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLanguage === 'auto' ? 'en' : sourceLanguage}|${targetLanguage}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.responseStatus === 200 && data.responseData) {
            const translatedText = data.responseData.translatedText;
            
            // Check if translation was successful
            if (translatedText && translatedText.toLowerCase() !== inputText.toLowerCase()) {
                showTranslation(translatedText);
                showSuccess();
            } else {
                // Fallback to LibreTranslate API
                await fallbackTranslation(inputText, sourceLanguage, targetLanguage);
            }
        } else {
            throw new Error('Translation failed');
        }
    } catch (error) {
        console.error('Translation error:', error);
        // Try fallback translation
        await fallbackTranslation(inputText, sourceLanguage, targetLanguage);
    } finally {
        showLoading(false);
        translateBtn.disabled = false;
    }
}

async function fallbackTranslation(text, sourceLang, targetLang) {
    try {
        // Use LibreTranslate API as fallback
        const response = await fetch('https://libretranslate.de/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: sourceLang === 'auto' ? 'en' : sourceLang,
                target: targetLang,
                format: 'text'
            })
        });

        if (!response.ok) {
            throw new Error('Fallback translation failed');
        }

        const data = await response.json();
        
        if (data.translatedText) {
            showTranslation(data.translatedText);
            showSuccess();
        } else {
            throw new Error('No translation received');
        }
    } catch (error) {
        console.error('Fallback translation error:', error);
        // If both APIs fail, show a mock translation for demo purposes
        showMockTranslation(text, targetLang);
    }
}

function showMockTranslation(text, targetLang) {
    // Simple mock translations for demo purposes
    const mockTranslations = {
        'es': 'Traducción de demostración: ' + text,
        'fr': 'Traduction de démonstration: ' + text,
        'de': 'Demo-Übersetzung: ' + text,
        'it': 'Traduzione demo: ' + text,
        'pt': 'Tradução de demonstração: ' + text,
        'ru': 'Демо перевод: ' + text,
        'ja': 'デモ翻訳: ' + text,
        'ko': '데모 번역: ' + text,
        'zh': '演示翻译: ' + text,
        'ar': 'ترجمة تجريبية: ' + text,
        'hi': 'डेमो अनुवाद: ' + text,
        'ur': 'ڈیمو ترجمہ: ' + text
    };

    const mockText = mockTranslations[targetLang] || `Demo translation to ${languageNames[targetLang]}: ${text}`;
    showTranslation(mockText);
    
    // Show info message about demo mode
    const outputElement = document.getElementById('outputText');
    outputElement.innerHTML += '<div style="margin-top: 10px; padding: 10px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; font-size: 0.9rem; color: #856404;"><i class="fas fa-info-circle"></i> Demo mode: Using mock translation. Deploy with translation API for real translations.</div>';
}

function showTranslation(text) {
    const outputElement = document.getElementById('outputText');
    outputElement.innerHTML = `<div style="text-align: left;">${text}</div>`;
    outputElement.parentElement.classList.add('success');
    
    // Remove success class after animation
    setTimeout(() => {
        outputElement.parentElement.classList.remove('success');
    }, 2000);
}

function showError(message) {
    const outputElement = document.getElementById('outputText');
    outputElement.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
    outputElement.parentElement.classList.add('error');
    
    setTimeout(() => {
        outputElement.parentElement.classList.remove('error');
    }, 3000);
}

function showSuccess() {
    const outputArea = document.querySelector('.output-area');
    outputArea.classList.add('success');
    
    setTimeout(() => {
        outputArea.classList.remove('success');
    }, 2000);
}

function clearOutput() {
    const outputElement = document.getElementById('outputText');
    outputElement.innerHTML = '<div class="placeholder"><i class="fas fa-arrow-left"></i> Translation will appear here</div>';
    outputElement.parentElement.classList.remove('success', 'error');
}

function showLoading(show) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

function swapLanguages() {
    const sourceSelect = document.getElementById('sourceLanguage');
    const targetSelect = document.getElementById('targetLanguage');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    // Don't swap if source is auto-detect
    if (sourceSelect.value === 'auto') {
        showError('Cannot swap when auto-detect is selected');
        return;
    }

    // Swap language selections
    const tempValue = sourceSelect.value;
    sourceSelect.value = targetSelect.value;
    targetSelect.value = tempValue;

    // Swap text content if both have content
    const currentOutput = outputText.textContent.trim();
    if (currentOutput && !currentOutput.includes('Translation will appear here') && !currentOutput.includes('Demo mode')) {
        const currentInput = inputText.value;
        inputText.value = currentOutput;
        
        // Trigger translation with swapped content
        if (currentInput.trim()) {
            setTimeout(() => translateText(), 100);
        }
    }

    // Add visual feedback
    const swapBtn = document.querySelector('.swap-btn');
    swapBtn.style.transform = 'rotate(180deg) scale(1.1)';
    setTimeout(() => {
        swapBtn.style.transform = '';
    }, 300);
}

function clearInput() {
    const inputText = document.getElementById('inputText');
    const charCount = document.querySelector('.char-count');
    const translateBtn = document.getElementById('translateBtn');

    inputText.value = '';
    charCount.textContent = '0 / 5000';
    translateBtn.disabled = true;
    clearOutput();

    // Focus back to input
    inputText.focus();
}

async function copyTranslation() {
    const outputElement = document.getElementById('outputText');
    const text = outputElement.textContent.trim();
    
    if (!text || text.includes('Translation will appear here')) {
        showError('No translation to copy');
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        
        // Show success feedback
        const copyBtn = document.querySelector('.copy-btn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        copyBtn.style.color = '#28a745';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.color = '';
        }, 2000);
        
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showError('Text copied to clipboard');
        } catch (fallbackError) {
            showError('Failed to copy text');
        }
        
        document.body.removeChild(textArea);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to translate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        translateText();
    }
    
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearInput();
    }
    
    // Ctrl/Cmd + C when focused on output to copy
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === document.getElementById('outputText')) {
        e.preventDefault();
        copyTranslation();
    }
});

// Add some visual enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});