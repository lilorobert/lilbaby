(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '1.0.0',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default'
        }
    };

    function applyTheme(theme) {
        $('#interface_mod_theme').remove();

        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            bywolf_mod: ` /* Твоя старая розовая тема */
                body {
                    background-color: #3b2a35;
                    color: #ffd9ec;
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
                    background: linear-gradient(to right, #ffb6c1 1%, #ff69b4 100%);
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
                    border: 2px solid #ffc0cb;
                    background: none !important;
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
            `,
            dark_neon: `
                body {
                    background-color: #121212;
                    color: #e0e0e0;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #00fff7;
                    background: none !important;
                }
            `,
            cyberpunk: `
                body {
                    background-color: #0f0f1b;
                    color: #ff00cc;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #ff00cc;
                    background: none !important;
                }
            `,
            solar_gold: `
                body {
                    background-color: #1e1e1e;
                    color: #ffd700;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #ffd700;
                    background: none !important;
                }
            `,
            forest_green: `
                body {
                    background-color: #1a2e1a;
                    color: #aaffaa;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #00cc66;
                    background: none !important;
                }
            `,
            violet_night: `
                body {
                    background-color: #2e003e;
                    color: #e0b3ff;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #cc66ff;
                    background: none !important;
                }
            `,
            fire_red: `
                body {
                    background-color: #2a0000;
                    color: #ff9999;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #ff3333;
                    background: none !important;
                }
            `,
            ocean_blue: `
                body {
                    background-color: #001f3f;
                    color: #cceeff;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #3399ff;
                    background: none !important;
                }
            `,
            sand_sunset: `
                body {
                    background-color: #3c2f2f;
                    color: #ffe4b5;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #ffcc99;
                    background: none !important;
                }
            `,
            mint_fresh: `
                body {
                    background-color: #002d2d;
                    color: #b3fff0;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #66ffcc;
                    background: none !important;
                }
            `
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
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
                    default: 'Обычная',
                    bywolf_mod: 'Космическая',
                    dark_neon: 'Неоновая тьма',
                    cyberpunk: 'Киберпанк',
                    solar_gold: 'Солнечное золото',
                    forest_green: 'Лесная зелень',
                    violet_night: 'Фиолетовая ночь',
                    fire_red: 'Огненно-красная',
                    ocean_blue: 'Океан',
                    sand_sunset: 'Песчаный закат',
                    mint_fresh: 'Свежая мята'
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

    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Набор тем оформления для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
