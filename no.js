изучи код (function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.4', // Обновляем версию из-за новых загрузчиков
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            font: 'system',
            loader: 'standard'
        }
    };

    // Доступные шрифты
    const availableFonts = {
        'system': 'Системный',
        'montserrat': 'Montserrat',
        'ubuntu': 'Ubuntu',
        'fira-sans': 'Fira Sans',
        'roboto': 'Roboto',
        'open-sans': 'Open Sans',
        'pt-sans': 'PT Sans',
        'exo2': 'Exo 2',
        'russo-one': 'Russo One',
        'comfortaa': 'Comfortaa',
        'netflix-style': 'Noto Sans (Netflix)',
        'kinopoisk': 'Manrope (КиноПоиск)',
        'raleway-film': 'Raleway (Постерный стиль)',
        'jost-cinema': 'Jost (Современный)',
        'merri-cinema': 'Merriweather (Артхаус / Драма)'
    };

    // Доступные загрузчики
    const availableLoaders = {
        'standard': 'Стандартный',
        'pulseLoader': 'PulseLoader',
        'spinCircle': 'SpinCircle',
        'waveDots': 'WaveDots',
        'orbitRings': 'OrbitRings',
        'bounceSquares': 'BounceSquares',
        'ripplePulse': 'RipplePulse',
        'gridFade': 'GridFade',
        'twirlBars': 'TwirlBars',
        'starBurst': 'StarBurst',
        'hexSpin': 'HexSpin'
    };

    // Цвета для загрузчиков
    const loaderColors = {
        default: '#fff'
    };

    function applyTheme(theme) {
        $('#interface_mod_theme').remove();
        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            galaxy_core: `
                body {
                    background-color: #0f0f2a;
                    color: #e8eaf6;
                }
                body.black--style {
                    background: #09091c;
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
                    background: linear-gradient(to right, #7c4dff 1%, #311b92 100%);
                    color: #e8eaf6;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #e8eaf6;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #1a1a4a 1%, #0a0a2a 100%);
                }
                .settings-input__links {
                    background-color: rgba(124, 77, 255, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #b388ff;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #b388ff !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #651fff;
                }
                .extensions {
                    background: #0a0a2a;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #1a1a4a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #d1c4e9;
                    color: #0f0f2a;
                }
                .torrent-serial {
                    background-color: rgba(124, 77, 255, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(124, 77, 255, 0.28);
                }
                .iptv-channel {
                    background-color: #3a3a6b !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #e8eaf6 !important;
                    opacity: 0.9;
                }
            `
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function applyFont(font) {
        $('#interface_mod_font').remove();

        if (font === 'system') return;

        const style = $('<style id="interface_mod_font"></style>');

        const fontStyles = {
            'montserrat': `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap&subset=cyrillic');`,
            'ubuntu': `@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap&subset=cyrillic');`,
            'fira-sans': `@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;700&display=swap&subset=cyrillic');`,
            'roboto': `@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap&subset=cyrillic');`,
            'open-sans': `@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap&subset=cyrillic');`,
            'pt-sans': `@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap&subset=cyrillic');`,
            'exo2': `@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700&display=swap&subset=cyrillic');`,
            'russo-one': `@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap&subset=cyrillic');`,
            'comfortaa': `@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;700&display=swap&subset=cyrillic');`,
            'netflix-style': `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap&subset=cyrillic');`,
            'kinopoisk': `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap&subset=cyrillic');`,
            'raleway-film': `@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap&subset=cyrillic');`,
            'jost-cinema': `@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&display=swap&subset=cyrillic');`,
            'merri-cinema': `@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;600;700&display=swap&subset=cyrillic');`
        };

        const fontFamily = {
            'montserrat': "'Montserrat', sans-serif",
            'ubuntu': "'Ubuntu', sans-serif",
            'fira-sans': "'Fira Sans', sans-serif",
            'roboto': "'Roboto', sans-serif",
            'open-sans': "'Open Sans', sans-serif",
            'pt-sans': "'PT Sans', sans-serif",
            'exo2': "'Exo 2', sans-serif",
            'russo-one': "'Russo One', sans-serif",
            'comfortaa': "'Comfortaa', cursive",
            'netflix-style': "'Noto Sans', sans-serif",
            'kinopoisk': "'Manrope', sans-serif",
            'raleway-film': "'Raleway', sans-serif",
            'jost-cinema': "'Jost', sans-serif",
            'merri-cinema': "'Merriweather', serif"
        };

        style.html(`
            ${fontStyles[font] || ''}
            body, .full-start-new__details, .settings-param-title {
                font-family: ${fontFamily[font]} !important;
            }
        `);

        $('head').append(style);
    }

    function applyLoader(loader) {
 $('#interface_loader_style').remove();

    if (loader === 'standard') return;

    const style = $('<style id="interface_loader_style"></style>');
    const color = loaderColors.default;
    let svgCode;


        switch (loader) {
            case 'pulseLoader':
                svgCode = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="135" height="140" fill="${color}"><rect width="15" height="120" y="10" rx="6"><animate attributeName="height" begin="0.5s" calcMode="linear" dur="1s" repeatCount="indefinite" values="120;110;100;90;80;70;60;50;40;140;120"/><animate attributeName="y" begin="0.5s" calcMode="linear" dur="1s" repeatCount="indefinite" values="10;15;20;25;30;35;40;45;50;0;10"/></rect><rect width="15" height="120" x="30" y="10" rx="6"><animate attributeName="height" begin="0.25s" calcMode="linear" dur="1s" repeatCount="indefinite" values="120;110;100;90;80;70;60;50;40;140;120"/><animate attributeName="y" begin="0.25s" calcMode="linear" dur="1s" repeatCount="indefinite" values="10;15;20;25;30;35;40;45;50;0;10"/></rect><rect width="15" height="140" x="60" rx="6"><animate attributeName="height" begin="0s" calcMode="linear" dur="1s" repeatCount="indefinite" values="120;110;100;90;80;70;60;50;40;140;120"/><animate attributeName="y" begin="0s" calcMode="linear" dur="1s" repeatCount="indefinite" values="10;15;20;25;30;35;40;45;50;0;10"/></rect><rect width="15" height="120" x="90" y="10" rx="6"><animate attributeName="height" begin="0.25s" calcMode="linear" dur="1s" repeatCount="indefinite" values="120;110;100;90;80;70;60;50;40;140;120"/><animate attributeName="y" begin="0.25s" calcMode="linear" dur="1s" repeatCount="indefinite" values="10;15;20;25;30;35;40;45;50;0;10"/></rect><rect width="15" height="120" x="120" y="10" rx="6"><animate attributeName="height" begin="0.5s" calcMode="linear" dur="1s" repeatCount="indefinite" values="120;110;100;90;80;70;60;50;40;140;120"/><animate attributeName="y" begin="0.5s" calcMode="linear" dur="1s" repeatCount="indefinite" values="10;15;20;25;30;35;40;45;50;0;10"/></rect></svg>`
                );
                break;
            case 'spinCircle':
                svgCode = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" stroke="${color}" stroke-width="8"><circle cx="50" cy="50" r="40"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite"/><animate attributeName="r" values="40;35;40" dur="0.8s" repeatCount="indefinite"/></circle></svg>`
                );
                break;
            case 'waveDots':
                svgCode = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" fill="${color}"><circle cx="20" cy="30"><animate attributeName="cy" values="30;15;30" dur="1s" repeatCount="indefinite" begin="0s"/></circle><circle cx="40" cy="30"><animate attributeName="cy" values="30;15;30" dur="1s" repeatCount="indefinite" begin="0.2s"/></circle><circle cx="60" cy="30"><animate attributeName="cy" values="30;15;30" dur="1s" repeatCount="indefinite" begin="0.4s"/></circle><circle cx="80" cy="30"><animate attributeName="cy" values="30;15;30" dur="1s" repeatCount="indefinite" begin="0.6s"/></circle><circle cx="100" cy="30"><animate attributeName="cy" values="30;15;30" dur="1s" repeatCount="indefinite" begin="0.8s"/></circle></svg>`
                );
                break;
            case 'orbitRings':
                svgCode = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" stroke="${color}" stroke-width="6"><circle cx="50" cy="50" r="30"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="50" cy="50" r="40"><animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="1.5s" repeatCount="indefinite"/></circle></svg>`
                );
                break;
            case 'bounceSquares':
                svgCode = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="${color}"><rect x="20" y="20" width="20" height="20"><animate attributeName="y" values="20;10;20" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="40" y="20" width="20" height="20"><animate attributeName="y" values="20;10;20" dur="1s" repeatCount="indefinite" begin="0.25s"/></rect><rect x="60" y="20" width="20" height="20"><animate attributeName="y" values="20;10;20" dur="1s" repeatCount="indefinite" begin="0.5s"/></rect><rect x="80" y="20" width="20" height="20"><animate attributeName="y" values="20;10;20" dur="1s" repeatCount="indefinite" begin="0.75s"/></rect></svg>`
                );
                break;
            case 'ripplePulse':
                svgCode = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" stroke="${color}" stroke-width="4"><circle cx="50" cy="50" r="20"><animate attributeName="r" values="20;40;20" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="50" cy="50" r="30"><animate attributeName="r" values="30;50;30" dur="1.5s" repeatCount="indefinite" begin="0.5s"/><animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" begin="0.5s"/></circle></svg>`
                );
                break;
            case 'gridFade':
                svgCode = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="${color}"><rect x="10" y="10" width="10" height="10"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="25" y="10" width="10" height="10"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.2s"/></rect><rect x="40" y="10" width="10" height="10"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.4s"/></rect><rect x="10" y="25" width="10" height="10"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.6s"/></rect><rect x="25" y="25" width="10" height="10"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.8s"/></rect><rect x="40" y="25" width="10" height="10"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="10" y="40" width="10" height="10"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.2s"/></rect><rect x="25" y="40" width="10" height="10"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.4s"/></rect><rect x="40" y="40" width="10" height="10"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.6s"/></rect></svg>`
                );
                break;
            case 'twirlBars':
                svgCode = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="${color}"><rect x="45" y="20" width="10" height="20"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="45" y="60" width="10" height="20"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite" begin="0.2s"/></rect><rect x="20" y="45" width="20" height="10"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite" begin="0.4s"/></rect><rect x="60" y="45" width="20" height="10"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite" begin="0.6s"/></rect></svg>`
                );
                break;
            case 'starBurst':
                svgCode = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="${color}"><path d="M50 20L55 40L75 45L55 50L50 70L45 50L25 45L45 40Z"><animate attributeName="transform" type="scale" values="1;1.2;1" dur="1s" repeatCount="indefinite"/></path><path d="M50 15L53 35L70 40L53 45L50 65L47 45L30 40L47 35Z"><animate attributeName="transform" type="scale" values="1;1.2;1" dur="1s" repeatCount="indefinite" begin="0.5s"/></path></svg>`
                );
                break;
            case 'hexSpin':
                svgCode = encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" stroke="${color}" stroke-width="6"><path d="M50 25L65 37.5L65 62.5L50 75L35 62.5L35 37.5Z"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1.2s" repeatCount="indefinite"/><animate attributeName="stroke-width" values="6;10;6" dur="1.2s" repeatCount="indefinite"/></path></svg>`
                );
                break;
        }

style.html(`
        .activity__loader,
        .player-video__loader {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none;
            background: url("data:image/svg+xml,${svgCode}") no-repeat 50% 50%;
            background-size: contain;
        }
    `);

    $('head').append(style);

    if (InterFaceMod.debug) {
        console.log(`${loader} applied, color:`, color);
        console.log('SVG length:', decodeURIComponent(svgCode).length);
    }
}

    function startPlugin() {
        // Загружаем настройки
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.font = Lampa.Storage.get('font_select', 'system');
        InterFaceMod.settings.loader = Lampa.Storage.get('loader_select', 'standard');

        // Применяем настройки
        applyTheme(InterFaceMod.settings.theme);
        applyFont(InterFaceMod.settings.font);
        applyLoader(InterFaceMod.settings.loader);

        // Добавляем компонент тем
        Lampa.SettingsApi.addComponent({
            component: 'theme_mod',
            name: 'LampaColor Theme',
            icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>'
        });

        // Добавляем выбор темы
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'theme_select',
                type: 'select',
                values: {
                    'default': 'Обычная',
                    'barbie': 'Барби',
                    'ocean_depth': 'Глубины океана',
                    'golden_sun': 'Золотое солнце',
                    'royal_purple': 'Королевский пурпур',
                    'fire_glow': 'Огненное сияние',
                    'icy_wind': 'Ледяной ветер',
                    'midnight_city': 'Ночной город',
                    'desert_sand': 'Пустынные пески',
                    'neon_dream': 'Неоновая мечта',
                    'emerald_island': 'Изумрудный остров',
                    'twilight_sky': 'Сумеречное небо',
                    'velvet_dusk': 'Бархатные сумерки',
                    'copper_blaze': 'Медный огонь',
                    'arctic_sky': 'Арктическое небо',
                    'blood_moon': 'Кровавая луна',
                    'cosmic_gold': 'Космическое золото',
                    'mystic_plum': 'Мистическая слива',
                    'steel_blue': 'Стальная синь',
                    'amber_night': 'Янтарная ночь',
                    'velvet_rose': 'Бархатная роза',
                    'galaxy_core': 'Ядро галактики'
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

        // Добавляем выбор шрифта
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'font_select',
                type: 'select',
                values: availableFonts,
                default: 'system'
            },
            field: {
                name: 'Выбор шрифта',
                description: 'Выберите шрифт интерфейса'
            },
            onChange: function (value) {
                InterFaceMod.settings.font = value;
                Lampa.Storage.set('font_select', value);
                applyFont(value);
            }
        });

        // Добавляем выбор загрузчика
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'loader_select',
                type: 'select',
                values: availableLoaders,
                default: 'standard'
            },
            field: {
                name: 'Выбор загрузчика',
                description: 'Выберите стиль загрузчика'
            },
            onChange: function (value) {
                InterFaceMod.settings.loader = value;
                Lampa.Storage.set('loader_select', value);
                applyLoader(value);
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
        description: 'Тема оформления, шрифты и загрузчики для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
