(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '1.0.1',
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
            bywolf_mod: `
                body { background-color: #3b2a35; color: #ffd9ec; }
                body.black--style { background: #2a1d27; }
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
                .settings-folder.focus .settings-folder__icon { filter: invert(1); }
                .settings-param-title > span { color: #fff; }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a2f3a 1%, #1c1016 100%);
                }
                .settings-input__links { background-color: rgba(255, 182, 193, 0.2); }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border: 2px solid #ffc0cb;
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
                .extensions { background: #2a1d27; }
                .extensions__item,
                .extensions__block-add { background-color: #503043; }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #ffd9ec;
                    color: #2a1d27;
                }
                .torrent-serial { background-color: rgba(255, 192, 203, 0.08); }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 192, 203, 0.28);
                }
                .iptv-channel { background-color: #6a3c58 !important; }
            `,

            neon_night: `
                body { background-color: #0f0f1a; color: #c471f5; }
                .card.focus .card__view::after,
                .card.hover .card__view::after { border: 2px solid #c471f5; }
                .menu__item.focus,
                .menu__item.hover {
                    outline: 1px solid #c471f5;
                    background-color: rgba(196, 113, 245, 0.1);
                }
            `,

            cyber_green: `
                body { background-color: #101d10; color: #aaffaa; }
                .card.focus .card__view::after,
                .card.hover .card__view::after { border: 2px solid #00ff7f; }
                .menu__item.focus,
                .menu__item.hover {
                    outline: 1px solid #00ff7f;
                    background-color: rgba(0, 255, 127, 0.1);
                }
            `,

            ocean_deep: `
                body { background-color: #001f3f; color: #7fdbff; }
                .card.focus .card__view::after,
                .card.hover .card__view::after { border: 2px solid #7fdbff; }
                .menu__item.focus,
                .menu__item.hover {
                    outline: 1px solid #7fdbff;
                    background-color: rgba(127, 219, 255, 0.1);
                }
            `,

            blood_moon: `
                body { background-color: #1a0000; color: #ff4d4d; }
                .card.focus .card__view::after,
                .card.hover .card__view::after { border: 2px solid #ff4d4d; }
                .menu__item.focus,
                .menu__item.hover {
                    outline: 1px solid #ff4d4d;
                    background-color: rgba(255, 77, 77, 0.1);
                }
            `,

            retro_wave: `
                body { background-color: #2e003e; color: #ff77ff; }
                .card.focus .card__view::after,
                .card.hover .card__view::after { border: 2px solid #ff77ff; }
                .menu__item.focus,
                .menu__item.hover {
                    outline: 1px solid #ff77ff;
                    background-color: rgba(255, 119, 255, 0.1);
                }
            `,

            forest_magic: `
                body { background-color: #0d1f0d; color: #aaffaa; }
                .card.focus .card__view::after,
                .card.hover .card__view::after { border: 2px solid #55ff55; }
                .menu__item.focus,
                .menu__item.hover {
                    outline: 1px solid #55ff55;
                    background-color: rgba(85, 255, 85, 0.1);
                }
            `,

            dark_gold: `
                body { background-color: #1a1a1a; color: #ffd700; }
                .card.focus .card__view::after,
                .card.hover .card__view::after { border: 2px solid #ffd700; }
                .menu__item.focus,
                .menu__item.hover {
                    outline: 1px solid #ffd700;
                    background-color: rgba(255, 215, 0, 0.1);
                }
            `,

            toxic_purple: `
                body { background-color: #1e002d; color: #cc99ff; }
                .card.focus .card__view::after,
                .card.hover .card__view::after { border: 2px solid #cc99ff; }
                .menu__item.focus,
                .menu__item.hover {
                    outline: 1px solid #cc99ff;
                    background-color: rgba(204, 153, 255, 0.1);
                }
            `,

            ice_blue: `
                body { background-color: #e6f7ff; color: #005580; }
                .card.focus .card__view::after,
                .card.hover .card__view::after { border: 2px solid #00bfff; }
                .menu__item.focus,
                .menu__item.hover {
                    outline: 1px solid #00bfff;
                    background-color: rgba(0, 191, 255, 0.1);
                }
            `,

            night_vision: `
                body { background-color: #001100; color: #39ff14; }
                .card.focus .card__view::after,
                .card.hover .card__view::after { border: 2px solid #39ff14; }
                .menu__item.focus,
                .menu__item.hover {
                    outline: 1px solid #39ff14;
                    background-color: rgba(57, 255, 20, 0.1);
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
                    'default': 'Обычная',
                    'bywolf_mod': 'Космическая',
                    'neon_night': 'Неоновая ночь',
                    'cyber_green': 'Кибер-зелёная',
                    'ocean_deep': 'Глубокий океан',
                    'blood_moon': 'Кровавая луна',
                    'retro_wave': 'Ретро-волна',
                    'forest_magic': 'Лесная магия',
                    'dark_gold': 'Тёмное золото',
                    'toxic_purple': 'Ядовитая сирень',
                    'ice_blue': 'Ледяная синь',
                    'night_vision': 'Ночное зрение'
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
        version: '1.0.1',
        description: 'Расширенные цветовые темы для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
