(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.1',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default'
        }
    };

    function applyTheme(theme) {
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
                /* Добавьте остальные стили для bywolf_mod */
            `,
            cosmic_blue: `
                body {
                    background-color: #001f3d;
                    color: #a7c7e7;
                }
                /* Добавьте остальные стили для cosmic_blue */
            `,
            sunny_yellow: `
                body {
                    background-color: #ffec3d;
                    color: #2a1d27;
                }
                /* Добавьте остальные стили для sunny_yellow */
            `,
            forest_green: `
                body {
                    background-color: #228b22;
                    color: #f0e68c;
                }
                /* Добавьте остальные стили для forest_green */
            `,
            ocean_blue: `
                body {
                    background-color: #0077be;
                    color: #f0f8ff;
                }
                /* Добавьте остальные стили для ocean_blue */
            `,
            sunset_orange: `
                body {
                    background-color: #ff4500;
                    color: #fff8dc;
                }
                /* Добавьте остальные стили для sunset_orange */
            `,
            lavender_purple: `
                body {
                    background-color: #8a2be2;
                    color: #ffffff;
                }
                /* Добавьте остальные стили для lavender_purple */
            `,
            cool_gray: `
                body {
                    background-color: #708090;
                    color: #ffffff;
                }
                /* Добавьте остальные стили для cool_gray */
            `,
            cherry_red: `
                body {
                    background-color: #d2042d;
                    color: #fffaf0;
                }
                /* Добавьте остальные стили для cherry_red */
            `,
            pastel_pink: `
                body {
                    background-color: #ffb6c1;
                    color: #2a1d27;
                }
                /* Добавьте остальные стили для pastel_pink */
            `,
            midnight_black: `
                body {
                    background-color: #000000;
                    color: #ffffff;
                }
                /* Добавьте остальные стили для midnight_black */
            `,
            emerald_green: `
                body {
                    background-color: #50c878;
                    color: #ffffff;
                }
                /* Добавьте остальные стили для emerald_green */
            `
        };

        // Добавляем стили в head
        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        // Применяем тему из хранилища
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        applyTheme(InterFaceMod.settings.theme);

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
                    'cosmic_blue': 'Космический Синий',
                    'sunny_yellow': 'Солнечный Желтый',
                    'forest_green': 'Лесной Зеленый',
                    'ocean_blue': 'Океанский Синий',
                    'sunset_orange': 'Закатный Оранжевый',
                    'lavender_purple': 'Лаванда',
                    'cool_gray': 'Прохладный Серый',
                    'cherry_red': 'Вишневый Красный',
                    'pastel_pink': 'Пастельный Розовый',
                    'midnight_black': 'Полночный Черный',
                    'emerald_green': 'Изумрудно Зеленый'
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
