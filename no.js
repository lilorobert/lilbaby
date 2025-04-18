(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.14', // Обновляем версию из-за фикса анимаций и центрирования
        debug: true, // Оставляем debug для отладки
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
        'ripplePulse': 'RipplePulse',
        'lampaCLetter': 'LampaCLetter',
        'lineWave': 'LineWave',
        'triangleSpin': 'TriangleSpin',
        'barPulse': 'BarPulse',
        'squareGrid': 'SquareGrid',
        'arrowBounce': 'ArrowBounce',
        'diamondFade': 'DiamondFade',
        'crossRotate': 'CrossRotate',
        'spinCircleOld': 'SpinCircle (Old)',
        'waveDots': 'WaveDots',
        'orbitRings': 'OrbitRings',
        'bounceSquares': 'BounceSquares',
        'ripplePulseOld': 'RipplePulse (Old)',
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
        if (InterFaceMod.debug) {
            console.log(`Theme ${theme} applied`);
        }
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
        if (InterFaceMod.debug) {
            console.log(`Font ${font} applied`);
        }
    }

    function applyLoader(loader) {
        $('#interface_loader_style').remove();
        if (loader === 'standard') return;

        const style = $('<style id="interface_loader_style"></style>');
        const color = loaderColors.default;
        let svgCode;

        try {
            switch (loader) {
                case 'pulseLoader':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><rect width="9.4" height="75" x="4.7" y="4.9" rx="3.75"><animate attributeName="height" begin="0.5s" calcMode="linear" dur="1s" repeatCount="indefinite" values="75;68.75;62.5;56.25;50;43.75;37.5;31.25;25;87.5;75"/><animate attributeName="y" begin="0.5s" calcMode="linear" dur="1s" repeatCount="indefinite" values="4.9;8.025;11.15;14.275;17.4;20.525;23.65;26.775;29.9;-0.25;4.9"/></rect><rect width="9.4" height="75" x="23.5" y="4.9" rx="3.75"><animate attributeName="height" begin="0.25s" calcMode="linear" dur="1s" repeatCount="indefinite" values="75;68.75;62.5;56.25;50;43.75;37.5;31.25;25;87.5;75"/><animate attributeName="y" begin="0.25s" calcMode="linear" dur="1s" repeatCount="indefinite" values="4.9;8.025;11.15;14.275;17.4;20.525;23.65;26.775;29.9;-0.25;4.9"/></rect><rect width="9.4" height="87.5" x="42.3" y="4.9" rx="3.75"><animate attributeName="height" begin="0s" calcMode="linear" dur="1s" repeatCount="indefinite" values="75;68.75;62.5;56.25;50;43.75;37.5;31.25;25;87.5;75"/><animate attributeName="y" begin="0s" calcMode="linear" dur="1s" repeatCount="indefinite" values="4.9;8.025;11.15;14.275;17.4;20.525;23.65;26.775;29.9;-0.25;4.9"/></rect><rect width="9.4" height="75" x="61.1" y="4.9" rx="3.75"><animate attributeName="height" begin="0.25s" calcMode="linear" dur="1s" repeatCount="indefinite" values="75;68.75;62.5;56.25;50;43.75;37.5;31.25;25;87.5;75"/><animate attributeName="y" begin="0.25s" calcMode="linear" dur="1s" repeatCount="indefinite" values="4.9;8.025;11.15;14.275;17.4;20.525;23.65;26.775;29.9;-0.25;4.9"/></rect><rect width="9.4" height="75" x="79.9" y="4.9" rx="3.75"><animate attributeName="height" begin="0.5s" calcMode="linear" dur="1s" repeatCount="indefinite" values="75;68.75;62.5;56.25;50;43.75;37.5;31.25;25;87.5;75"/><animate attributeName="y" begin="0.5s" calcMode="linear" dur="1s" repeatCount="indefinite" values="4.9;8.025;11.15;14.275;17.4;20.525;23.65;26.775;29.9;-0.25;4.9"/></rect></svg>`
                    );
                    break;
                case 'spinCircle':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="none" stroke="${color}" stroke-width="6.784"><circle cx="42.4" cy="42.4" r="33.92"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1s" repeatCount="indefinite"/><animate attributeName="r" values="33.92;29.68;33.92" dur="0.8s" repeatCount="indefinite"/></circle></svg>`
                    );
                    break;
                case 'ripplePulse':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="none" stroke="${color}" stroke-width="3.392"><circle cx="42.4" cy="42.4" r="16.96"><animate attributeName="r" values="16.96;33.92;16.96" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="42.4" cy="42.4" r="25.44"><animate attributeName="r" values="25.44;42.4;25.44" dur="1.5s" repeatCount="indefinite" begin="0.5s"/><animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" begin="0.5s"/></circle></svg>`
                    );
                    break;
                case 'lampaCLetter':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><text x="5.648" y="67.84" font-family="Arial" font-size="33.92" font-weight="bold">LampaC</text><text x="5.648" y="67.84" font-family="Arial" font-size="33.92" fill="none" stroke="${color}" stroke-width="1.696"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0s"/></text><text x="5.648" y="67.84" font-family="Arial" font-size="33.92" fill="${color}"><animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" begin="0.5s"/></text></svg>`
                    );
                    break;
                case 'lineWave':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><rect x="14.12" y="14.12" width="7.064" height="14.12"><animate attributeName="height" values="14.12;28.24;14.12" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="28.24" y="14.12" width="7.064" height="14.12"><animate attributeName="height" values="14.12;28.24;14.12" dur="1s" repeatCount="indefinite" begin="0.2s"/></rect><rect x="42.36" y="14.12" width="7.064" height="14.12"><animate attributeName="height" values="14.12;28.24;14.12" dur="1s" repeatCount="indefinite" begin="0.4s"/></rect><rect x="56.48" y="14.12" width="7.064" height="14.12"><animate attributeName="height" values="14.12;28.24;14.12" dur="1s" repeatCount="indefinite" begin="0.6s"/></rect></svg>`
                    );
                    break;
                case 'triangleSpin':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><path d="M42.4 16.96L67.84 55.08L16.96 55.08Z"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0.5;1" dur="1.2s" repeatCount="indefinite"/></path></svg>`
                    );
                    break;
                case 'barPulse':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><rect x="14.12" y="14.12" width="42.36" height="7.064"><animate attributeName="width" values="42.36;56.48;42.36" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="14.12" y="28.24" width="42.36" height="7.064"><animate attributeName="width" values="42.36;56.48;42.36" dur="1s" repeatCount="indefinite" begin="0.5s"/></rect></svg>`
                    );
                    break;
                case 'squareGrid':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><rect x="7.064" y="7.064" width="10.596" height="10.596"><animateTransform attributeName="transform" type="rotate" from="0 12.376 12.376" to="360 12.376 12.376" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="24.704" y="7.064" width="10.596" height="10.596"><animateTransform attributeName="transform" type="rotate" from="0 30.016 12.376" to="360 30.016 12.376" dur="1s" repeatCount="indefinite" begin="0.2s"/></rect><rect x="7.064" y="24.704" width="10.596" height="10.596"><animateTransform attributeName="transform" type="rotate" from="0 12.376 30.016" to="360 12.376 30.016" dur="1s" repeatCount="indefinite" begin="0.4s"/></rect><rect x="24.704" y="24.704" width="10.596" height="10.596"><animateTransform attributeName="transform" type="rotate" from="0 30.016 30.016" to="360 30.016 30.016" dur="1s" repeatCount="indefinite" begin="0.6s"/></rect></svg>`
                    );
                    break;
                case 'arrowBounce':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><path d="M21.2 16.96L42.4 33.92L63.6 16.96"><animate attributeName="y" values="0;7.064;0" dur="1s" repeatCount="indefinite" begin="0s"/></path><path d="M21.2 33.92L42.4 50.88L63.6 33.92"><animate attributeName="y" values="0;7.064;0" dur="1s" repeatCount="indefinite" begin="0.5s"/></path></svg>`
                    );
                    break;
                case 'diamondFade':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><path d="M42.4 16.96L67.84 42.4L42.4 67.84L16.96 42.4Z"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0s"/></path><path d="M42.4 25.44L59.36 42.4L42.4 59.36L25.44 42.4Z"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.5s"/></path></svg>`
                    );
                    break;
                case 'crossRotate':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><rect x="38.128" y="16.96" width="8.472" height="50.88"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1s" repeatCount="indefinite"/></rect><rect x="16.96" y="38.128" width="50.88" height="8.472"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1s" repeatCount="indefinite"/></rect></svg>`
                    );
                    break;
                case 'spinCircleOld':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="none" stroke="${color}" stroke-width="6.784"><circle cx="42.4" cy="42.4" r="33.92"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1s" repeatCount="indefinite"/><animate attributeName="r" values="33.92;29.68;33.92" dur="0.8s" repeatCount="indefinite"/></circle></svg>`
                    );
                    break;
                case 'waveDots':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><circle cx="14.12" cy="25.44" r="4.24"><animate attributeName="cy" values="25.44;12.72;25.44" dur="1s" repeatCount="indefinite" begin="0s"/></circle><circle cx="28.24" cy="25.44" r="4.24"><animate attributeName="cy" values="25.44;12.72;25.44" dur="1s" repeatCount="indefinite" begin="0.2s"/></circle><circle cx="42.36" cy="25.44" r="4.24"><animate attributeName="cy" values="25.44;12.72;25.44" dur="1s" repeatCount="indefinite" begin="0.4s"/></circle><circle cx="56.48" cy="25.44" r="4.24"><animate attributeName="cy" values="25.44;12.72;25.44" dur="1s" repeatCount="indefinite" begin="0.6s"/></circle><circle cx="70.6" cy="25.44" r="4.24"><animate attributeName="cy" values="25.44;12.72;25.44" dur="1s" repeatCount="indefinite" begin="0.8s"/></circle></svg>`
                    );
                    break;
                case 'orbitRings':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="none" stroke="${color}" stroke-width="5.088"><circle cx="42.4" cy="42.4" r="25.44"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="42.4" cy="42.4" r="33.92"><animateTransform attributeName="transform" type="rotate" from="360 42.4 42.4" to="0 42.4 42.4" dur="1.5s" repeatCount="indefinite"/></circle></svg>`
                    );
                    break;
                case 'bounceSquares':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><rect x="14.12" y="14.12" width="14.12" height="14.12"><animate attributeName="y" values="14.12;7.064;14.12" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="28.24" y="14.12" width="14.12" height="14.12"><animate attributeName="y" values="14.12;7.064;14.12" dur="1s" repeatCount="indefinite" begin="0.25s"/></rect><rect x="42.36" y="14.12" width="14.12" height="14.12"><animate attributeName="y" values="14.12;7.064;14.12" dur="1s" repeatCount="indefinite" begin="0.5s"/></rect><rect x="56.48" y="14.12" width="14.12" height="14.12"><animate attributeName="y" values="14.12;7.064;14.12" dur="1s" repeatCount="indefinite" begin="0.75s"/></rect></svg>`
                    );
                    break;
                case 'ripplePulseOld':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="none" stroke="${color}" stroke-width="3.392"><circle cx="42.4" cy="42.4" r="16.96"><animate attributeName="r" values="16.96;33.92;16.96" dur="1.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="42.4" cy="42.4" r="25.44"><animate attributeName="r" values="25.44;42.4;25.44" dur="1.5s" repeatCount="indefinite" begin="0.5s"/><animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" begin="0.5s"/></circle></svg>`
                    );
                    break;
                case 'gridFade':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><rect x="7.064" y="7.064" width="7.064" height="7.064"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="17.66" y="7.064" width="7.064" height="7.064"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.2s"/></rect><rect x="28.256" y="7.064" width="7.064" height="7.064"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.4s"/></rect><rect x="7.064" y="17.66" width="7.064" height="7.064"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.6s"/></rect><rect x="17.66" y="17.66" width="7.064" height="7.064"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.8s"/></rect><rect x="28.256" y="17.66" width="7.064" height="7.064"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="7.064" y="28.256" width="7.064" height="7.064"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.2s"/></rect><rect x="17.66" y="28.256" width="7.064" height="7.064"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.4s"/></rect><rect x="28.256" y="28.256" width="7.064" height="7.064"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" begin="0.6s"/></rect></svg>`
                    );
                    break;
                case 'twirlBars':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><rect x="38.128" y="16.96" width="8.472" height="16.96"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1s" repeatCount="indefinite" begin="0s"/></rect><rect x="38.128" y="50.88" width="8.472" height="16.96"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1s" repeatCount="indefinite" begin="0.2s"/></rect><rect x="16.96" y="38.128" width="16.96" height="8.472"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1s" repeatCount="indefinite" begin="0.4s"/></rect><rect x="50.88" y="38.128" width="16.96" height="8.472"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1s" repeatCount="indefinite" begin="0.6s"/></rect></svg>`
                    );
                    break;
                case 'starBurst':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="${color}"><path d="M42.4 16.96L46.64 33.92L63.6 38.16L46.64 42.4L42.4 59.36L38.16 42.4L21.2 38.16L38.16 33.92Z"><animate attributeName="transform" type="scale" values="1;1.2;1" dur="1s" repeatCount="indefinite"/></path><path d="M42.4 12.72L44.944 29.68L59.36 33.92L44.944 38.16L42.4 55.12L39.856 38.16L25.44 33.92L39.856 29.68Z"><animate attributeName="transform" type="scale" values="1;1.2;1" dur="1s" repeatCount="indefinite" begin="0.5s"/></path></svg>`
                    );
                    break;
                case 'hexSpin':
                    svgCode = encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="84.8" height="84.8" viewBox="0 0 84.8 84.8" fill="none" stroke="${color}" stroke-width="5.088"><path d="M42.4 21.2L55.12 31.796L55.12 53.004L42.4 63.6L29.68 53.004L29.68 31.796Z"><animateTransform attributeName="transform" type="rotate" from="0 42.4 42.4" to="360 42.4 42.4" dur="1.2s" repeatCount="indefinite"/><animate attributeName="stroke-width" values="5.088;8.48;5.088" dur="1.2s" repeatCount="indefinite"/></path></svg>`
                    );
                    break;
                default:
                    console.error(`Unknown loader: ${loader}`);
                    return;
            }

            style.html(`
                .activity__loader {
                    background: url("data:image/svg+xml,${svgCode}") no-repeat 50% 50% !important;
                    background-size: 80% 80% !important;
                    -webkit-background-size: 80% 80% !important;
                    -moz-background-size: 80% 80% !important;
                    -o-background-size: 80% 80% !important;
                    display: block !important; /* Временно для теста */
                    width: 84.8px;
                    height: 84.8px;
                }
                .player-video__loader {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: url("data:image/svg+xml,${svgCode}") no-repeat 50% 50% !important;
                    background-size: 80% 80% !important;
                    -webkit-background-size: 80% 80% !important;
                    -moz-background-size: 80% 80% !important;
                    -o-background-size: 80% 80% !important;
                    display: none;
                    width: 84.8px;
                    height: 84.8px;
                }
            `);
            $('head').append(style);

            // Проверка отображения .activity__loader и .player-video__loader
            setTimeout(() => {
                const activityLoaders = document.querySelectorAll('.activity__loader');
                activityLoaders.forEach(loader => {
                    const styles = window.getComputedStyle(loader);
                    if (InterFaceMod.debug) {
                        console.log(`Activity loader: display=${styles.display}, background=${styles.background}, width=${styles.width}, height=${styles.height}`);
                    }
                });

                const videoLoaders = document.querySelectorAll('.player-video__loader');
                videoLoaders.forEach(loader => {
                    const styles = window.getComputedStyle(loader);
                    if (InterFaceMod.debug) {
                        console.log(`Video loader: display=${styles.display}, background=${styles.background}, width=${styles.width}, height=${styles.height}, position=${styles.position}, top=${styles.top}, left=${styles.left}, transform=${styles.transform}`);
                    }
                });
            }, 1000);

            // MutationObserver для отслеживания изменений .activity__loader
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    if (mutation.target.classList.contains('activity__loader')) {
                        const styles = window.getComputedStyle(mutation.target);
                        if (InterFaceMod.debug) {
                            console.log(`Activity loader changed: display=${styles.display}, classList=${mutation.target.classList}`);
                        }
                    }
                });
            });
            observer.observe(document.body, { childList: true, subtree: true, attributes: true });

            if (InterFaceMod.debug) {
                console.log(`Loader ${loader} applied, color: ${color}`);
                console.log(`SVG size: 84.8x84.8, length: ${decodeURIComponent(svgCode).length}`);
            }
        } catch (e) {
            console.error(`Error applying loader ${loader}:`, e);
        }
    }

    function startPlugin() {
        try {
            InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
            InterFaceMod.settings.font = Lampa.Storage.get('font_select', 'system');
            InterFaceMod.settings.loader = Lampa.Storage.get('loader_select', 'standard');

            applyTheme(InterFaceMod.settings.theme);
            applyFont(InterFaceMod.settings.font);
            applyLoader(InterFaceMod.settings.loader);

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

            if (InterFaceMod.debug) {
                console.log('LampaColor plugin started');
            }
        } catch (e) {
            console.error('Error starting LampaColor plugin:', e);
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

    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Тема оформления, шрифты и загрузчики для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
