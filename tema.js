(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.2', // обновим версию
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',  
            personalColor: '#ffffff' // новый параметр для персонального цвета
        }
    };

    function applyTheme(theme) {
        // Удаляем старые стили, если они есть
        $('#interface_mod_theme').remove();

        if (theme === 'default') return; // Если тема по умолчанию, не применяем стили

        const style = $('<style id="interface_mod_theme"></style>'); // Создаем элемент стилей

        const themes = {
            bywolf_mod: `/* Космическая тема */ ...`, // (оставим как есть)
            personal: `
                body {
                    background-color: ${InterFaceMod.settings.personalColor};
                    color: #000; // текст черный для контраста
                }
            `
        };

        // Добавляем стили в head
        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        // Применяем тему из хранилища
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.personalColor = Lampa.Storage.get('personal_color', '#ffffff'); // получаем персональный цвет
        applyTheme(InterFaceMod.settings.theme);

        // Добавляем настройку в интерфейс
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
                    'personal': 'Персональная' // добавляем новый выбор
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
                
                // Если выбрана персональная тема, показываем элемент для выбора цвета
                if (value === 'personal') {
                    $('#personal_color_picker').show();
                } else {
                    $('#personal_color_picker').hide();
                }
            }
        });

        // Добавляем параметр выбора цвета для персональной темы
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'personal_color',
                type: 'color',
                default: '#ffffff', // белый цвет по умолчанию
            },
            field: {
                name: 'Цвет фона для персональной темы',
                description: 'Выберите цвет для персональной темы'
            },
            onChange: function (color) {
                InterFaceMod.settings.personalColor = color;
                Lampa.Storage.set('personal_color', color); // сохраняем выбранный цвет
                if (InterFaceMod.settings.theme === 'personal') {
                    applyTheme('personal'); // сразу применяем, если выбрана персональная тема
                }
            }
        });

        // Скрываем выбор цвета, если выбрана не персональная тема
        if (InterFaceMod.settings.theme !== 'personal') {
            $('#personal_color_picker').hide();
        }
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
        description: 'Тема оформления для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
