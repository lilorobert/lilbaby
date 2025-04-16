(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.4',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            color: '#FF0000' // Дефолтный цвет (красный)
        }
    };

    // 10 популярных цветов
    const COLOR_PRESETS = {
        '#FF0000': 'Красный',
        '#00FF00': 'Зелёный',
        '#0000FF': 'Синий',
        '#FFFF00': 'Жёлтый',
        '#FF00FF': 'Розовый',
        '#00FFFF': 'Голубой',
        '#FFA500': 'Оранжевый',
        '#800080': 'Фиолетовый',
        '#008000': 'Тёмно-зелёный',
        '#FFC0CB': 'Светло-розовый'
    };

    function applyTheme(theme, color) {
        $('#interface_mod_theme').remove();
        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            bywolf_mod: `...`, // Твой CSS для "Космической" темы
            custom: `
                /* Динамические стили для выбранного цвета */
                .menu__item.focus, 
                .card.focus .card__view::after,
                .settings-folder.focus {
                    background: ${color} !important;
                }
                .time-line > div {
                    background: ${color} !important;
                }
            `
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        // Загружаем сохранённые настройки
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.color = Lampa.Storage.get('color_preset', '#FF0000');
        applyTheme(InterFaceMod.settings.theme, InterFaceMod.settings.color);

        // Выбор темы
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'theme_select',
                type: 'select',
                values: {
                    'default': 'Обычная',
                    'bywolf_mod': 'Космическая',
                    'custom': '🌈 Цветная'
                },
                default: 'default'
            },
            field: {
                name: 'Тема оформления',
                description: 'Выберите стиль интерфейса'
            },
            onChange: function (value) {
                InterFaceMod.settings.theme = value;
                Lampa.Storage.set('theme_select', value);
                applyTheme(value, InterFaceMod.settings.color);
            }
        });

        // Выбор цвета (только для "Цветной" темы)
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'color_preset',
                type: 'select',
                values: COLOR_PRESETS,
                default: '#FF0000'
            },
            field: {
                name: 'Цвет акцентов',
                description: 'Выберите из популярных вариантов',
                hidden: () => InterFaceMod.settings.theme !== 'custom'
            },
            onChange: function (value) {
                InterFaceMod.settings.color = value;
                Lampa.Storage.set('color_preset', value);
                applyTheme('custom', value);
            }
        });
    }

    // Запуск плагина
    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', (e) => e.type === 'ready' && startPlugin());

    // Информация о плагине
    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Темы с выбором цвета'
    };
})();
