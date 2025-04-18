(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.2',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            font: 'system' // Добавляем настройку шрифта
        }
    };

    // Доступные шрифты
    const availableFonts = {
        'system': 'Системный',
        'roboto': 'Roboto',
        'open-sans': 'Open Sans',
        'montserrat': 'Montserrat',
        'lato': 'Lato',
        'play': 'Play',
        'ubuntu': 'Ubuntu',
        'pt-sans': 'PT Sans',
        'exo2': 'Exo 2',
        'fira-sans': 'Fira Sans'
    };

    function applyTheme(theme) {
        $('#interface_mod_theme').remove();
        if (theme === 'default') return;

        // ... (ваши существующие стили тем остаются без изменений)
    }

    function applyFont(font) {
        // Удаляем предыдущие стили шрифтов
        $('#interface_mod_font').remove();

        if (font === 'system') return; // Используем системный шрифт

        const style = $('<style id="interface_mod_font"></style>');

        const fontStyles = {
            'roboto': `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');`,
            'open-sans': `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');`,
            'montserrat': `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');`,
            'lato': `@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');`,
            'play': `@import url('https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap');`,
            'ubuntu': `@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');`,
            'pt-sans': `@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');`,
            'exo2': `@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700&display=swap');`,
            'fira-sans': `@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;700&display=swap');`
        };

        const fontFamily = {
            'roboto': "'Roboto', sans-serif",
            'open-sans': "'Open Sans', sans-serif",
            'montserrat': "'Montserrat', sans-serif",
            'lato': "'Lato', sans-serif",
            'play': "'Play', sans-serif",
            'ubuntu': "'Ubuntu', sans-serif",
            'pt-sans': "'PT Sans', sans-serif",
            'exo2': "'Exo 2', sans-serif",
            'fira-sans': "'Fira Sans', sans-serif"
        };

        style.html(`
            ${fontStyles[font] || ''}
            body, .full-start-new__details, .settings-param-title {
                font-family: ${fontFamily[font]} !important;
            }
        `);

        $('head').append(style);
    }

    function startPlugin() {
        // Загружаем настройки
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.font = Lampa.Storage.get('font_select', 'system');
        
        // Применяем настройки
        applyTheme(InterFaceMod.settings.theme);
        applyFont(InterFaceMod.settings.font);

        // Добавляем компонент тем
        Lampa.SettingsApi.addComponent({
            component: 'theme_mod',
            name: 'LampaColor Theme',
            icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>'
        });

        // Добавляем выбор темы
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'theme_select',
                type: 'select',
                values: {
                    'default': 'Обычная',
                    'bywolf_mod': 'Космическая',
                    // ... остальные темы
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

        // Добавляем выбор шрифта (НОВЫЙ БЛОК)
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'font_select',
                type: 'select',
                values: availableFonts,
                default: 'system'
            },
            field: {
                name: 'Выбор шрифта',
                description: 'Выберите шрифт интерфейса'
            },
            onChange: function (value) {
                InterFaceMod.settings.font = value;
                Lampa.Storage.set('font_select', value);
                applyFont(value);
            }
        });
    }

    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') {
                startPlugin();
            }
        });
    }

    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Тема оформления и шрифты для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
