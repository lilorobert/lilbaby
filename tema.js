(function() {
    'use strict';

    // Проверяем доступность необходимых API Lampa
    if (!window.Lampa || !Lampa.Storage || !Lampa.SettingsApi) {
        console.error('Lampa API is not available');
        return;
    }

    // Основной объект плагина
    var LampaColor = {
        name: 'LampaColor',
        version: '0.0.4',
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

        // Если выбрана стандартная тема - ничего не делаем
        if (LampaColor.settings.theme === 'default') return;

        // Создаем элемент для стилей
        LampaColor.stylesheet = $('<style id="lampa_color_theme"></style>');

        // Генерируем CSS в зависимости от темы
        var css = '';
        if (LampaColor.settings.theme === 'bywolf_mod') {
            css = generateBywolfTheme();
        } 
        else if (LampaColor.settings.theme === 'custom') {
            css = generateCustomTheme();
        }

        // Добавляем стили в документ
        LampaColor.stylesheet.html(css);
        $('head').append(LampaColor.stylesheet);
    }

    // Генератор темы Bywolf
    function generateBywolfTheme() {
        return `
            body {
                background-color: #3b2a35;
                color: #ffd9ec;
            }
            /* ... остальные стили bywolf ... */
        `;
    }

    // Генератор кастомной темы
    function generateCustomTheme() {
        var c = LampaColor.settings.colors;
        return `
            body {
                background-color: ${c.background};
                color: ${c.text};
            }
            .menu__item.focus {
                background: linear-gradient(to right, ${c.accentLight} 1%, ${c.accent} 100%);
            }
            /* ... другие элементы с кастомными цветами ... */
        `;
    }

    // Инициализация плагина
    function initPlugin() {
        // Загружаем сохраненные настройки
        loadSettings();

        // Добавляем компонент в настройки
        Lampa.SettingsApi.addComponent({
            component: 'lampa_color',
            name: 'Lampa Color Theme',
            icon: '<!-- ваша иконка -->'
        });

        // Добавляем выбор темы
        addThemeSelector();

        // Добавляем настройки цветов (только для кастомной темы)
        addColorSettings();
    }

    // Загрузка сохраненных настроек
    function loadSettings() {
        var savedTheme = Lampa.Storage.get('lampa_color_theme');
        if (savedTheme) LampaColor.settings.theme = savedTheme;

        var savedColors = Lampa.Storage.get('lampa_color_colors');
        if (savedColors) LampaColor.settings.colors = savedColors;
    }

    // Сохранение настроек
    function saveSettings() {
        Lampa.Storage.set('lampa_color_theme', LampaColor.settings.theme);
        Lampa.Storage.set('lampa_color_colors', LampaColor.settings.colors);
    }

    // Добавляем выбор темы
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
                description: 'Select interface theme'
            },
            onChange: function(value) {
                LampaColor.settings.theme = value;
                saveSettings();
                applyTheme();
            }
        });
    }

    // Добавляем настройки цветов
    function addColorSettings() {
        addColorSetting('background', 'Background color', '#3b2a35');
        addColorSetting('text', 'Text color', '#ffd9ec');
        addColorSetting('accent', 'Accent color', '#ff69b4');
        addColorSetting('accentLight', 'Light accent', '#ffb6c1');
        addColorSetting('card', 'Card color', '#503043');
    }

    // Добавляем параметр для конкретного цвета
    function addColorSetting(name, label, defaultValue) {
        Lampa.SettingsApi.addParam({
            component: 'lampa_color',
            param: {
                name: 'color_' + name,
                type: 'text',
                default: LampaColor.settings.colors[name] || defaultValue
            },
            field: {
                name: label,
                description: 'HEX color code',
                html: `
                    <div class="color-picker">
                        <input type="color" value="${LampaColor.settings.colors[name] || defaultValue}" 
                               data-color="${name}">
                        <input type="text" value="${LampaColor.settings.colors[name] || defaultValue}" 
                               data-color-text="${name}" maxlength="7">
                    </div>
                `
            },
            onChange: function(value) {
                if (isValidColor(value)) {
                    LampaColor.settings.colors[name] = value;
                    saveSettings();
                    if (LampaColor.settings.theme === 'custom') applyTheme();
                }
            }
        });
    }

    // Проверка HEX цвета
    function isValidColor(color) {
        return /^#[0-9A-F]{6}$/i.test(color);
    }

    // Запускаем плагин после загрузки приложения
    if (window.appready) {
        initPlugin();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type === 'ready') initPlugin();
        });
    }

    // Регистрируем плагин
    if (Lampa.Manifest && Lampa.Manifest.plugins) {
        Lampa.Manifest.plugins['LampaColor'] = {
            name: 'Lampa Color',
            version: '0.0.4',
            description: 'Custom color themes for Lampa'
        };
    }

    window.LampaColor = LampaColor;
})();
