(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.2',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            customColor: '#ff69b4' // Значение по умолчанию
        }
    };

    function applyTheme(theme, customColor) {
        $('#interface_mod_theme').remove();

        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            bywolf_mod: `
                body {
                    background-color: #3b2a35;
                    color: #ffd9ec;
                }
                /* ... остальные стили bywolf_mod ... */
            `,
            custom: `
                body {
                    background-color: #1a1a1a;
                    color: #ffffff;
                }

                .menu__item.focus,
                .menu__item.traverse,
                .menu__item.hover,
                .settings-folder.focus,
                .settings-param.focus,
                .selectbox-item.focus,
                .selectbox-item.hover,
                .full-person.focus,
                .full-start__button.focus,
                .full-descr__tag.focus,
                .simple-button.focus,
                .iptv-list__item.focus,
                .iptv-menu__list-item.focus,
                .head__action.focus,
                .head__action.hover,
                .player-panel .button.focus,
                .search-source.active {
                    background: ${customColor};
                    color: #000000;
                }

                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: ${customColor};
                }

                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: ${customColor};
                }
            `
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.customColor = Lampa.Storage.get('custom_color', '#ff69b4');
        applyTheme(InterFaceMod.settings.theme, InterFaceMod.settings.customColor);

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
                applyTheme(value, InterFaceMod.settings.customColor);
            }
        });

        // Добавляем новую настройку для кастомного цвета
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'custom_color',
                type: 'text',
                default: '#ff69b4'
            },
            field: {
                name: 'Персональный цвет',
                description: 'Введите HEX-код цвета (например, #ff0000)',
                hidden: () => InterFaceMod.settings.theme !== 'custom' // Показываем только когда выбрана персональная тема
            },
            onChange: function (value) {
                // Проверяем, что это корректный HEX-цвет
                if (/^#[0-9A-F]{6}$/i.test(value)) {
                    InterFaceMod.settings.customColor = value;
                    Lampa.Storage.set('custom_color', value);
                    if (InterFaceMod.settings.theme === 'custom') {
                        applyTheme('custom', value);
                    }
                } else {
                    Lampa.Noty.show('Введите корректный HEX-цвет (например, #ff0000)');
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

    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Тема оформления для Lampa с поддержкой персонального цвета'
    };

    window.lampa_theme = InterFaceMod;
})();
