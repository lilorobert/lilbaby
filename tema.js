(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.3',
        settings: {
            enabled: true,
            theme: Lampa.Storage.get('theme_select', 'default'),
            customColor: Lampa.Storage.get('custom_color', '#ff69b4')
        }
    };

    function applyTheme(theme) {
        $('#interface_mod_theme').remove();

        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');
        const color = InterFaceMod.settings.customColor;

        const themes = {
            bywolf_mod: `
                body {
                    background-color: #3b2a35;
                    color: #ffd9ec;
                }
                .menu__item.focus,
                .menu__item.hover {
                    background: linear-gradient(to right, #ffb6c1 1%, #ff69b4 100%);
                    color: #2a1d27;
                }
            `,
            custom: `
                .menu__item.focus,
                .menu__item.hover,
                .settings-param.focus,
                .selectbox-item.focus,
                .simple-button.focus {
                    background: ${color} !important;
                    color: #fff !important;
                }
            `
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        applyTheme(InterFaceMod.settings.theme);

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

                // если выбрана "custom", перерисуем параметры
                if (value === 'custom') {
                    Lampa.Settings.updateParams('theme_mod');
                }
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'custom_color',
                type: 'color',
                default: InterFaceMod.settings.customColor
            },
            field: {
                name: 'Цвет персональной темы',
                description: 'Выберите цвет для персональной темы'
            },
            onChange: function (value) {
                InterFaceMod.settings.customColor = value;
                Lampa.Storage.set('custom_color', value);
                if (InterFaceMod.settings.theme === 'custom') {
                    applyTheme('custom');
                }
            },
            condition: () => InterFaceMod.settings.theme === 'custom'
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
        version: '1.0.1',
        description: 'Тема оформления с персональным цветом для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
