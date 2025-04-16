(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.3',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            customColors: {
                background: '#3b2a35',
                text: '#ffd9ec',
                accent: '#ff69b4',
                accentLight: '#ffb6c1',
                card: '#503043'
            }
        }
    };

    function applyTheme(theme) {
        $('#interface_mod_theme').remove();
        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            bywolf_mod: `
                /* ... (оставляем ваши оригинальные стили bywolf_mod) ... */
            `,
            custom: generateCustomTheme()
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function generateCustomTheme() {
        const c = InterFaceMod.settings.customColors;
        return `
            /* ... (оставляем вашу функцию генерации кастомной темы) ... */
        `;
    }

    function startPlugin() {
        // Загружаем сохраненные настройки
        const savedColors = Lampa.Storage.get('custom_colors');
        if(savedColors) InterFaceMod.settings.customColors = savedColors;

        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        applyTheme(InterFaceMod.settings.theme);

        // Добавляем компонент в настройки
        Lampa.SettingsApi.addComponent({
            component: 'theme_mod',
            name: 'LampaColor Theme',
            icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>'
        });

        // Добавляем параметр выбора темы
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'theme_select',
                type: 'select',
                values: {
                    'default': 'Обычная',
                    'bywolf_mod': 'Космическая',
                    'custom': 'Персональная'
                },
                default: 'default'
            },
            field: {
                name: 'Выбор темы',
                description: 'Выберите тему оформления интерфейса'
            },
            onChange: function (value) {
                InterFaceMod.settings.theme = value;
                Lampa.Storage.set('theme_select', value);
                applyTheme(value);
            }
        });

        // Добавляем параметры для кастомных цветов
        addColorSettings();
    }

    function addColorSettings() {
        const colors = InterFaceMod.settings.customColors;
        
        // Фон
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'custom_bg',
                type: 'text',
                default: colors.background
            },
            field: {
                name: 'Цвет фона',
                description: 'HEX-код (например, #3b2a35)',
                html: `<input type="color" value="${colors.background}" data-color="background">`
            },
            onChange: function(value) {
                colors.background = validateColor(value) ? value : colors.background;
                saveColors();
            }
        });

        // Текст
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'custom_text',
                type: 'text',
                default: colors.text
            },
            field: {
                name: 'Цвет текста',
                description: 'HEX-код (например, #ffd9ec)',
                html: `<input type="color" value="${colors.text}" data-color="text">`
            },
            onChange: function(value) {
                colors.text = validateColor(value) ? value : colors.text;
                saveColors();
            }
        });

        // Акцент
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'custom_accent',
                type: 'text',
                default: colors.accent
            },
            field: {
                name: 'Акцентный цвет',
                description: 'HEX-код (например, #ff69b4)',
                html: `<input type="color" value="${colors.accent}" data-color="accent">`
            },
            onChange: function(value) {
                colors.accent = validateColor(value) ? value : colors.accent;
                saveColors();
            }
        });

        // Светлый акцент
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'custom_accent_light',
                type: 'text',
                default: colors.accentLight
            },
            field: {
                name: 'Светлый акцент',
                description: 'HEX-код (например, #ffb6c1)',
                html: `<input type="color" value="${colors.accentLight}" data-color="accentLight">`
            },
            onChange: function(value) {
                colors.accentLight = validateColor(value) ? value : colors.accentLight;
                saveColors();
            }
        });

        // Карточки
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'custom_card',
                type: 'text',
                default: colors.card
            },
            field: {
                name: 'Цвет карточек',
                description: 'HEX-код (например, #503043)',
                html: `<input type="color" value="${colors.card}" data-color="card">`
            },
            onChange: function(value) {
                colors.card = validateColor(value) ? value : colors.card;
                saveColors();
            }
        });
    }

    function validateColor(color) {
        return /^#[0-9A-F]{6}$/i.test(color);
    }

    function saveColors() {
        Lampa.Storage.set('custom_colors', InterFaceMod.settings.customColors);
        if(InterFaceMod.settings.theme === 'custom') {
            applyTheme('custom');
        }
    }

    // Инициализация плагина
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') {
                startPlugin();
            }
        });
    }

    // Регистрация плагина
    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Тема оформления для Lampa с персонализацией цветов'
    };

    window.lampa_theme = InterFaceMod;
})();
