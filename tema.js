(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.1',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            userColor: '#ff69b4'  // Дефолтный цвет
        }
    };

    function applyTheme(theme, color) {
        $('#interface_mod_theme').remove();

        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            bywolf_mod: `
                body {
                    background-color: #3b2a35;
                    color: ${color};
                }

                body.black--style {
                    background: #2a1d27;
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
                    background: linear-gradient(to right, #ffb6c1 1%, ${color} 100%);
                    color: #2a1d27;
                }

                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }

                .settings-param-title > span {
                    color: #fff;
                }

                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a2f3a 1%, #1c1016 100%);
                }

                .settings-input__links {
                    background-color: rgba(255, 182, 193, 0.2);
                }

                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ffc0cb;
                }

                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ffc0cb !important;
                }

                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ffc0cb;
                }

                .extensions {
                    background: #2a1d27;
                }

                .extensions__item,
                .extensions__block-add {
                    background-color: #503043;
                }

                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #ffd9ec;
                    color: #2a1d27;
                }

                .torrent-serial {
                    background-color: rgba(255, 192, 203, 0.08);
                }

                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 192, 203, 0.28);
                }

                .iptv-channel {
                    background-color: #6a3c58 !important;
                }
            `
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        // Применяем тему и цвет из хранилища
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.userColor = Lampa.Storage.get('user_color', '#ff69b4');
        applyTheme(InterFaceMod.settings.theme, InterFaceMod.settings.userColor);

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
                    'bywolf_mod': 'Космическая'
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
                applyTheme(value, InterFaceMod.settings.userColor);
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'user_color',
                type: 'color',
                value: InterFaceMod.settings.userColor,
                field: {
                    name: 'Цвет интерфейса',
                    description: 'Выберите цвет интерфейса'
                },
                onChange: function (value) {
                    InterFaceMod.settings.userColor = value;
                    Lampa.Storage.set('user_color', value);
                    applyTheme(InterFaceMod.settings.theme, value);
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
        description: 'Тема оформления для Lampa с выбором цвета'
    };

    window.lampa_theme = InterFaceMod;
})();
