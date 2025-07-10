// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Aplicar tema salvo
        this.applyTheme(this.currentTheme);
        
        // Criar botão de toggle
        this.createToggleButton();
        
        // Adicionar event listeners
        this.setupEventListeners();
    }

    createToggleButton() {
        // Verificar se o botão já existe
        if (document.querySelector('.theme-toggle')) {
            return;
        }

        const toggleButton = document.createElement('button');
        toggleButton.className = 'theme-toggle';
        toggleButton.setAttribute('aria-label', 'Alternar tema');
        toggleButton.innerHTML = this.getToggleIcon();
        
        document.body.appendChild(toggleButton);
    }

    getToggleIcon() {
        if (this.currentTheme === 'dark') {
            return `
                <svg class="theme-toggle-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                </svg>
            `;
        } else {
            return `
                <svg class="theme-toggle-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
            `;
        }
    }

    setupEventListeners() {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Detectar mudanças de preferência do sistema
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener((e) => {
                if (!localStorage.getItem('theme')) {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme();
        this.updateToggleIcon();
        
        // Animação suave
        this.animateThemeChange();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Atualizar meta theme-color para mobile
        this.updateMetaThemeColor(theme);
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    }

    updateToggleIcon() {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            toggleButton.innerHTML = this.getToggleIcon();
        }
    }

    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }

    animateThemeChange() {
        // Adicionar classe de transição suave
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Remover após a transição
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Método para detectar preferência do sistema
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Método para resetar para preferência do sistema
    resetToSystemTheme() {
        localStorage.removeItem('theme');
        const systemTheme = this.getSystemTheme();
        this.applyTheme(systemTheme);
        this.updateToggleIcon();
    }
}

// Inicializar o gerenciador de tema quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Função global para alternar tema (pode ser chamada de qualquer lugar)
function toggleTheme() {
    if (window.themeManager) {
        window.themeManager.toggleTheme();
    }
}

// Função para aplicar tema específico
function setTheme(theme) {
    if (window.themeManager && (theme === 'light' || theme === 'dark')) {
        window.themeManager.applyTheme(theme);
        window.themeManager.saveTheme();
        window.themeManager.updateToggleIcon();
    }
}

// Exportar para uso em outros módulos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, toggleTheme, setTheme };
}

