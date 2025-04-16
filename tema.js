(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.2',  // обновим версию
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

        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'theme_select',
                type: 'select',
                values: {
                    'default': 'Обычная',
                    'bywolf_mod': 'Космическая',
                    'custom_theme': 'Персональная'
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

        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
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
                    if (InterFaceMod.settings.theme === 'custom_theme') {
                        applyTheme('custom_theme', value);
                    }
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
