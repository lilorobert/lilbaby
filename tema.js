(function() {
    'use strict';

    // Проверяем доступность Lampa API
    if (!window.Lampa || !Lampa.Storage || !Lampa.SettingsApi) {
        console.error('Lampa API is not available');
        return;
    }

    var LampaColor = {
        name: 'LampaColor',
        version: '0.0.6',
        settings: {
            theme: 'default',
            colors: {
                background: '#3b2a35',
                text: '#ffd9ec',
                accent: '#ff69b4',
                accentLight: '#ffb6c1',
                card: '#503043'
            }
        },
        stylesheet: null
    };

    // Применяем выбранную тему
    function applyTheme() {
        // Удаляем старые стили
        if (LampaColor.stylesheet) {
            LampaColor.stylesheet.remove();
            LampaColor.stylesheet = null;
        }

        if (LampaColor.settings.theme === 'default') return;

        LampaColor.stylesheet = $('<style id="lampa_color_theme"></style>');

        var css = '';
        if (LampaColor.settings.theme === 'bywolf_mod') {
            css = generateBywolfTheme();
        } 
        else if (LampaColor.settings.theme === 'custom') {
            css = generateCustomTheme();
        }

        LampaColor.stylesheet.html(css);
        $('head').append(LampaColor.stylesheet);
    }

    function generateBywolfTheme() {
        return `body{background-color:#3b2a35;color:#ffd9ec;}`;
    }

    function generateCustomTheme() {
        var c = LampaColor.settings.colors;
        return `
            body {
                background-color: ${c.background};
                color: ${c.text};
            }
            .menu__item.focus {
                background: ${c.accent};
                color: ${c.text};
            }
        `;
    }

    function initPlugin() {
        loadSettings();

        Lampa.SettingsApi.addComponent({
            component: 'lampa_color',
            name: 'Lampa Color',
            icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>'
        });

        addThemeSelector();
        addColorSettings();
    }

    function loadSettings() {
        var saved = Lampa.Storage.get('lampa_color_settings');
        if (saved) {
            LampaColor.settings.theme = saved.theme || 'default';
            LampaColor.settings.colors = saved.colors || LampaColor.settings.colors;
        }
        applyTheme();
    }

    function saveSettings() {
        Lampa.Storage.set('lampa_color_settings', {
            theme: LampaColor.settings.theme,
            colors: LampaColor.settings.colors
        });
    }

    function addThemeSelector() {
        Lampa.SettingsApi.addParam({
            component: 'lampa_color',
            param: {
                name: 'theme',
                type: 'select',
                values: {
                    'default': 'Default',
                    'bywolf_mod': 'Cosmic',
                    'custom': 'Custom'
                },
                default: 'default'
            },
            field: {
                name: 'Theme',
                description: 'Select color theme'
            },
            onChange: function(value) {
                LampaColor.settings.theme = value;
                saveSettings();
                applyTheme();
            }
        });
    }

    function addColorSettings() {
        var colors = [
            {name: 'background', label: 'Background', default: '#3b2a35'},
            {name: 'text', label: 'Text', default: '#ffd9ec'},
            {name: 'accent', label: 'Accent', default: '#ff69b4'},
            {name: 'accentLight', label: 'Light accent', default: '#ffb6c1'},
            {name: 'card', label: 'Cards', default: '#503043'}
        ];

        colors.forEach(function(color) {
            Lampa.SettingsApi.addParam({
                component: 'lampa_color',
                param: {
                    name: 'color_' + color.name,
                    type: 'text',
                    default: LampaColor.settings.colors[color.name] || color.default
                },
                field: {
                    name: color.label,
                    description: 'HEX color code',
                    html: `
                        <div class="color-picker">
                            <input type="color" value="${LampaColor.settings.colors[color.name] || color.default}" 
                                   data-color="${color.name}">
                            <input type="text" value="${LampaColor.settings.colors[color.name] || color.default}" 
                                   data-color-text="${color.name}" maxlength="7">
                        </div>
                    `
                },
                onChange: function(value) {
                    if (/^#[0-9A-F]{6}$/i.test(value)) {
                        LampaColor.settings.colors[color.name] = value;
                        saveSettings();
                        if (LampaColor.settings.theme === 'custom') applyTheme();
                    }
                }
            });
        });
    }

    // Новая улучшенная инициализация
    function checkAppReady() {
        if (window.appready) {
            initPlugin();
        } else {
            var listener = Lampa.Listener.follow('app', function(e) {
                if (e.type === 'ready') {
                    initPlugin();
                    // Безопасное отключение слушателя
                    if (listener && listener.unfollow) {
                        listener.unfollow();
                    }
                }
            });
        }
    }

    // Запускаем проверку готовности
    checkAppReady();

    // Регистрация плагина
    if (Lampa.Manifest && Lampa.Manifest.plugins) {
        Lampa.Manifest.plugins.LampaColor = {
            name: 'Lampa Color',
            version: '0.0.6',
            description: 'Custom color themes for Lampa'
        };
    }

    window.LampaColor = LampaColor;
})();
