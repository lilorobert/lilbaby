(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.2',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            customColor: '#ffffff'  // добавляем свойство для хранения цвета
        }
    };

    function applyTheme(theme, customColor) {
        // Удаляем старые стили, если они есть
        $('#interface_mod_theme').remove();

        if (theme === 'default') return; // Если тема по умолчанию, не применяем стили

        const style = $('<style id="interface_mod_theme"></style>'); // Создаем элемент стилей

        const themes = {
            bywolf_mod: `
                body {
                    background-color: #3b2a35;
                    color: #ffd9ec;
                }
                /* другие стили для bywolf_mod */
            `,
            custom_theme: `
                body {
                    background-color: ${customColor};
                    color: ${customColor === '#ffffff' ? '#000000' : '#ffffff'};  // текст белым или чёрным в зависимости от фона
                }
                /* другие стили для custom_theme */
            `
        };

        // Добавляем стили в head
        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        // Применяем тему из хранилища
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.customColor = Lampa.Storage.get('custom_color', '#ffffff');  // загружаем персональный цвет
        applyTheme(InterFaceMod.settings.theme, InterFaceMod.settings.customColor);

        // Добавляем настройку в интерфейс
        Lampa.SettingsApi.addComponent({
            component: 'theme_mod',
            name: 'LampaColor Theme',
            icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>'
        });

        // Добавляем параметр для выбора темы
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'theme_select',
                type: 'select',
                values: {
                    'default': 'Обычная',
                    'bywolf_mod': 'Космическая',
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
                applyTheme(value, InterFaceMod.settings.customColor);
            }
        });

        // Добавляем отдельный пункт для "Персональной темы"
        Lampa.SettingsApi.addComponent({
            component: 'personal_theme_mod',
            name: 'Персональная тема',
            icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></svg>'
        });

        // Параметр для ввода кода цвета в "Персональной теме"
        Lampa.SettingsApi.addParam({
            component: 'personal_theme_mod',
            param: {
                name: 'custom_color',
                type: 'text',
                value: InterFaceMod.settings.customColor,
                field: {
                    name: 'Персональный цвет фона',
                    description: 'Введите код цвета для персональной темы (например, #ff5733)'
                },
                onChange: function (value) {
                    InterFaceMod.settings.customColor = value;
                    Lampa.Storage.set('custom_color', value);
                    applyTheme('custom_theme', value);  // Применяем выбранный цвет
                }
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

    // Регистрация плагина
    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Тема оформления для Lampa с возможностью выбора персонального цвета'
    };

    window.lampa_theme = InterFaceMod;
})();
