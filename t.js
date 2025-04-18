(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.2',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            font: 'system' // Добавляем настройку шрифта
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
    // Стили лоадеров (10+ вариантов)
    const loaderStyles = {
        'default': {
            name: 'Стандартный',
            color: '#ff5722',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="135" height="140" fill="#COLOR#">
                <rect width="15" height="120" y="10" rx="6">
                    <animate attributeName="height" begin="0.5s" dur="1s" repeatCount="indefinite" values="120;110;100;90;80;70;60;50;40;140;120"/>
                    <animate attributeName="y" begin="0.5s" dur="1s" repeatCount="indefinite" values="10;15;20;25;30;35;40;45;50;0;10"/>
                </rect>
                <rect width="15" height="120" x="30" y="10" rx="6">
                    <animate attributeName="height" begin="0.25s" dur="1s" repeatCount="indefinite" values="120;110;100;90;80;70;60;50;40;140;120"/>
                    <animate attributeName="y" begin="0.25s" dur="1s" repeatCount="indefinite" values="10;15;20;25;30;35;40;45;50;0;10"/>
                </rect>
                <rect width="15" height="140" x="60" rx="6">
                    <animate attributeName="height" begin="0s" dur="1s" repeatCount="indefinite" values="120;110;100;90;80;70;60;50;40;140;120"/>
                    <animate attributeName="y" begin="0s" dur="1s" repeatCount="indefinite" values="10;15;20;25;30;35;40;45;50;0;10"/>
                </rect>
                <rect width="15" height="120" x="90" y="10" rx="6">
                    <animate attributeName="height" begin="0.25s" dur="1s" repeatCount="indefinite" values="120;110;100;90;80;70;60;50;40;140;120"/>
                    <animate attributeName="y" begin="0.25s" dur="1s" repeatCount="indefinite" values="10;15;20;25;30;35;40;45;50;0;10"/>
                </rect>
                <rect width="15" height="120" x="120" y="10" rx="6">
                    <animate attributeName="height" begin="0.5s" dur="1s" repeatCount="indefinite" values="120;110;100;90;80;70;60;50;40;140;120"/>
                    <animate attributeName="y" begin="0.5s" dur="1s" repeatCount="indefinite" values="10;15;20;25;30;35;40;45;50;0;10"/>
                </rect>
            </svg>`
        },
        'pulse': {
            name: 'Пульсация',
            color: '#00bcd4',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#COLOR#">
                <circle cx="50" cy="50" r="0" opacity="1">
                    <animate attributeName="r" dur="1.5s" repeatCount="indefinite" values="0;30;0"/>
                    <animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="1;0.5;0"/>
                </circle>
                <circle cx="50" cy="50" r="0" opacity="1">
                    <animate attributeName="r" dur="1.5s" begin="0.5s" repeatCount="indefinite" values="0;30;0"/>
                    <animate attributeName="opacity" dur="1.5s" begin="0.5s" repeatCount="indefinite" values="1;0.5;0"/>
                </circle>
            </svg>`
        },
        'spinner': {
            name: 'Круговой',
            color: '#9c27b0',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="#COLOR#">
                <circle cx="50" cy="50" r="40" stroke-width="8" stroke-dasharray="60 15" stroke-linecap="round" fill="none">
                    <animateTransform attributeName="transform" type="rotate" dur="1.5s" repeatCount="indefinite" values="0 50 50;360 50 50"/>
                </circle>
            </svg>`
        },
        'dots': {
            name: 'Точечный',
            color: '#4caf50',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="100" fill="#COLOR#">
                <circle cx="20" cy="50" r="10">
                    <animate attributeName="cy" dur="1s" repeatCount="indefinite" values="50;30;50;70;50" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"/>
                </circle>
                <circle cx="60" cy="50" r="10">
                    <animate attributeName="cy" dur="1s" begin="0.2s" repeatCount="indefinite" values="50;30;50;70;50" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"/>
                </circle>
                <circle cx="100" cy="50" r="10">
                    <animate attributeName="cy" dur="1s" begin="0.4s" repeatCount="indefinite" values="50;30;50;70;50" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"/>
                </circle>
                <circle cx="140" cy="50" r="10">
                    <animate attributeName="cy" dur="1s" begin="0.6s" repeatCount="indefinite" values="50;30;50;70;50" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"/>
                </circle>
                <circle cx="180" cy="50" r="10">
                    <animate attributeName="cy" dur="1s" begin="0.8s" repeatCount="indefinite" values="50;30;50;70;50" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"/>
                </circle>
            </svg>`
        },
        'neon': {
            name: 'Неоновый',
            color: '#ff00ff',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="#COLOR#">
                <path d="M30,30 L120,30 L90,120 Z" stroke-width="4" fill="none">
                    <animate attributeName="stroke" dur="2s" repeatCount="indefinite" values="#ff00ff;#00ffff;#ff00ff"/>
                </path>
                <path d="M40,40 L110,40 L80,110 Z" stroke-width="3" fill="none">
                    <animate attributeName="stroke" dur="2s" begin="0.5s" repeatCount="indefinite" values="#00ffff;#ff00ff;#00ffff"/>
                </path>
            </svg>`
        },
        'bounce': {
            name: 'Прыгающий',
            color: '#ff9800',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#COLOR#">
                <circle cx="50" cy="30" r="10">
                    <animate attributeName="cy" dur="1s" repeatCount="indefinite" values="30;70;30" keyTimes="0;0.5;1" calcMode="spline" keySplines="0.5 0 0.5 1;0.5 0 0.5 1"/>
                </circle>
            </svg>`
        },
        'ripple': {
            name: 'Волны',
            color: '#2196f3',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#COLOR#">
                <circle cx="50" cy="50" r="10" opacity="0">
                    <animate attributeName="r" dur="2s" repeatCount="indefinite" values="0;40" keyTimes="0;1" keySplines="0.1 0.8 0.2 1"/>
                    <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1;0" keyTimes="0;1"/>
                </circle>
                <circle cx="50" cy="50" r="10" opacity="0">
                    <animate attributeName="r" dur="2s" begin="1s" repeatCount="indefinite" values="0;40" keyTimes="0;1" keySplines="0.1 0.8 0.2 1"/>
                    <animate attributeName="opacity" dur="2s" begin="1s" repeatCount="indefinite" values="1;0" keyTimes="0;1"/>
                </circle>
            </svg>`
        },
        'metaball': {
            name: 'Метаболлы',
            color: '#e91e63',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#COLOR#">
                <circle cx="30" cy="50" r="20">
                    <animate attributeName="cx" dur="3s" repeatCount="indefinite" values="30;70;30"/>
                </circle>
                <circle cx="70" cy="50" r="20">
                    <animate attributeName="cx" dur="3s" repeatCount="indefinite" values="70;30;70"/>
                </circle>
            </svg>`
        },
        'clock': {
            name: 'Часы',
            color: '#3f51b5',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#COLOR#">
                <circle cx="50" cy="50" r="45" stroke-width="3" fill="none"/>
                <line x1="50" y1="50" x2="50" y2="30" stroke-width="3">
                    <animateTransform attributeName="transform" type="rotate" dur="6s" repeatCount="indefinite" values="0 50 50;360 50 50"/>
                </line>
                <line x1="50" y1="50" x2="50" y2="20" stroke-width="5">
                    <animateTransform attributeName="transform" type="rotate" dur="60s" repeatCount="indefinite" values="0 50 50;360 50 50"/>
                </line>
            </svg>`
        },
        'infinity': {
            name: 'Бесконечность',
            color: '#8bc34a',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" stroke="#COLOR#" stroke-width="5">
                <path d="M20,50 C35,20 65,20 80,50 C95,80 65,80 50,50 C35,20 5,20 20,50 Z">
                    <animate attributeName="stroke-dashoffset" dur="3s" repeatCount="indefinite" values="0;200;0"/>
                    <animate attributeName="stroke-dasharray" dur="3s" repeatCount="indefinite" values="10,10;100,100;10,10"/>
                </path>
            </svg>`
        }
    };

        function applyTheme(theme) {
        $('#interface_mod_theme').remove();
        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            barbie: `
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
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #ffd9ec !important;
                    opacity: 0.9;
                }
            `,
            ocean_depth: `
                body {
                    background-color: #0f2a3d;
                    color: #e0f7ff;
                }
                body.black--style {
                    background: #091c28;
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
                    background: linear-gradient(to right, #4fc3f7 1%, #1976d2 100%);
                    color: #0d1b2a;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #e0f7ff;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #1a3a4a 1%, #0a1a25 100%);
                }
                .settings-input__links {
                    background-color: rgba(79, 195, 247, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #80d8ff;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #80d8ff !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #40c4ff;
                }
                .extensions {
                    background: #0a1e2d;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #1a3a4a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #b3e5fc;
                    color: #0d1b2a;
                }
                .torrent-serial {
                    background-color: rgba(79, 195, 247, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(79, 195, 247, 0.28);
                }
                .iptv-channel {
                    background-color: #2a506b !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #e0f7ff !important;
                    opacity: 0.9;
                }
            `,
            golden_sun: `
                body {
                    background-color: #3d2e0f;
                    color: #fff8e1;
                }
                body.black--style {
                    background: #281c09;
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
                    background: linear-gradient(to right, #ffd54f 1%, #f57f17 100%);
                    color: #3e2723;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #fff8e1;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a3a2a 1%, #2a1c0a 100%);
                }
                .settings-input__links {
                    background-color: rgba(255, 213, 79, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ffe082;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ffe082 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ffca28;
                }
                .extensions {
                    background: #2a210f;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #4a3a2a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #ffecb3;
                    color: #3d2e0f;
                }
                .torrent-serial {
                    background-color: rgba(255, 213, 79, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 213, 79, 0.28);
                }
                .iptv-channel {
                    background-color: #6b5a3c !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #fff8e1 !important;
                    opacity: 0.9;
                }
            `,
            royal_purple: `
                body {
                    background-color: #2a0f3d;
                    color: #f3e5f5;
                }
                body.black--style {
                    background: #1c0928;
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
                    background: linear-gradient(to right, #ba68c8 1%, #7b1fa2 100%);
                    color: #f3e5f5;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #f3e5f5;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #3a1f4a 1%, #1c0a2a 100%);
                }
                .settings-input__links {
                    background-color: rgba(186, 104, 200, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ce93d8;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ce93d8 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ab47bc;
                }
                .extensions {
                    background: #1c1028;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #3a1f4a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #e1bee7;
                    color: #2a0f3d;
                }
                .torrent-serial {
                    background-color: rgba(186, 104, 200, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(186, 104, 200, 0.28);
                }
                .iptv-channel {
                    background-color: #5a3c6b !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #f3e5f5 !important;
                    opacity: 0.9;
                }
            `,
            fire_glow: `
                body {
                    background-color: #3d1a0f;
                    color: #ffebee;
                }
                body.black--style {
                    background: #281009;
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
                    background: linear-gradient(to right, #ff8a65 1%, #d32f2f 100%);
                    color: #3e1a12;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #ffebee;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a2a1f 1%, #2a0a0a 100%);
                }
                .settings-input__links {
                    background-color: rgba(255, 138, 101, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ffab91;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ffab91 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ff7043;
                }
                .extensions {
                    background: #2a1009;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #4a2a1f;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #ffcdd2;
                    color: #3d1a0f;
                }
                .torrent-serial {
                    background-color: rgba(255, 138, 101, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 138, 101, 0.28);
                }
                .iptv-channel {
                    background-color: #6b3c3a !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #ffebee !important;
                    opacity: 0.9;
                }
            `,
            icy_wind: `
                body {
                    background-color: #0f3d3d;
                    color: #e0f7f7;
                }
                body.black--style {
                    background: #092828;
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
                    background: linear-gradient(to right, #80deea 1%, #00838f 100%);
                    color: #0d2a2a;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #e0f7f7;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #1a4a4a 1%, #0a2a2a 100%);
                }
                .settings-input__links {
                    background-color: rgba(128, 222, 234, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #b2ebf2;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #b2ebf2 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #4dd0e1;
                }
                .extensions {
                    background: #0a2d2d;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #1a4a4a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #b2ebf2;
                    color: #0d2a2a;
                }
                .torrent-serial {
                    background-color: rgba(128, 222, 234, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(128, 222, 234, 0.28);
                }
                .iptv-channel {
                    background-color: #3a6b6b !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #e0f7f7 !important;
                    opacity: 0.9;
                }
            `,
            midnight_city: `
                body {
                    background-color: #1a1a2e;
                    color: #e6e6fa;
                }
                body.black--style {
                    background: #0f0f1c;
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
                    background: linear-gradient(to right, #9fa8da 1%, #3949ab 100%);
                    color: #e6e6fa;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #e6e6fa;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #2a2a4a 1%, #0f0f2a 100%);
                }
                .settings-input__links {
                    background-color: rgba(159, 168, 218, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #c5cae9;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #c5cae9 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #7986cb;
                }
                .extensions {
                    background: #0f0f2a;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #2a2a4a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #d1d9ff;
                    color: #1a1a2e;
                }
                .torrent-serial {
                    background-color: rgba(159, 168, 218, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(159, 168, 218, 0.28);
                }
                .iptv-channel {
                    background-color: #4a4a6b !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #e6e6fa !important;
                    opacity: 0.9;
                }
            `,
            desert_sand: `
                body {
                    background-color: #3d332a;
                    color: #f5f5f0;
                }
                body.black--style {
                    background: #282218;
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
                    background: linear-gradient(to right, #d7ccc8 1%, #8d6e63 100%);
                    color: #3e3228;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #f5f5f0;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a3a2a 1%, #2a1c0a 100%);
                }
                .settings-input__links {
                    background-color: rgba(215, 204, 200, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #efebe9;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #efebe9 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #bcaaa4;
                }
                .extensions {
                    background: #2a2218;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #4a3a2a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #efebe9;
                    color: #3d332a;
                }
                .torrent-serial {
                    background-color: rgba(215, 204, 200, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(215, 204, 200, 0.28);
                }
                .iptv-channel {
                    background-color: #6b5a4a !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #f5f5f0 !important;
                    opacity: 0.9;
                }
            `,
            neon_dream: `
                body {
                    background-color: #1a1e2e;
                    color: #f8f8ff;
                }
                body.black--style {
                    background: #0f111c;
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
                    background: linear-gradient(to right, #ff80ab 1%, #b388ff 100%);
                    color: #1a1a2e;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #f8f8ff;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #2a1e4a 1%, #0f112a 100%);
                }
                .settings-input__links {
                    background-color: rgba(255, 128, 171, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ff94c2;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ff94c2 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ff5c8d;
                }
                .extensions {
                    background: #0f1128;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #2a1e4a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #ffc1e3;
                    color: #1a1e2e;
                }
                .torrent-serial {
                    background-color: rgba(255, 128, 171, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 128, 171, 0.28);
                }
                .iptv-channel {
                    background-color: #4a3c6b !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #f8f8ff !important;
                    opacity: 0.9;
                }
            `,
            emerald_island: `
                body {
                    background-color: #0f3d2a;
                    color: #e8f5e9;
                }
                body.black--style {
                    background: #092818;
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
                    background: linear-gradient(to right, #69f0ae 1%, #00c853 100%);
                    color: #0d2a1a;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #e8f5e9;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #1a4a2a 1%, #0a2a18 100%);
                }
                .settings-input__links {
                    background-color: rgba(105, 240, 174, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #b9f6ca;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #b9f6ca !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #00e676;
                }
                .extensions {
                    background: #0a2818;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #1a4a2a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #c8e6c9;
                    color: #0f3d2a;
                }
                .torrent-serial {
                    background-color: rgba(105, 240, 174, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(105, 240, 174, 0.28);
                }
                .iptv-channel {
                    background-color: #3a6b4a !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #e8f5e9 !important;
                    opacity: 0.9;
                }
            `,
            twilight_sky: `
                body {
                    background-color: #2a1a3d;
                    color: #f3e5ff;
                }
                body.black--style {
                    background: #1c1028;
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
                    background: linear-gradient(to right, #b388ff 1%, #7c4dff 100%);
                    color: #f3e5ff;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #f3e5ff;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #3a1a4a 1%, #1c0a28 100%);
                }
                .settings-input__links {
                    background-color: rgba(179, 136, 255, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #d1c4e9;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #d1c4e9 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #9575cd;
                }
                .extensions {
                    background: #1c1028;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #3a1a4a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #e1bee7;
                    color: #2a1a3d;
                }
                .torrent-serial {
                    background-color: rgba(179, 136, 255, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(179, 136, 255, 0.28);
                }
                .iptv-channel {
                    background-color: #5a3c6b !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #f3e5ff !important;
                    opacity: 0.9;
                }
            `,
            velvet_dusk: `
                body {
                    background-color: #2a1a2a;
                    color: #f5e6ff;
                }
                body.black--style {
                    background: #1a0f1a;
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
                    background: linear-gradient(to right, #c678dd 1%, #6c3082 100%);
                    color: #f5e6ff;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #f5e6ff;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #3a1a3a 1%, #1c0a1c 100%);
                }
                .settings-input__links {
                    background-color: rgba(198, 120, 221, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #e1bee7;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #e1bee7 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ba68c8;
                }
                .extensions {
                    background: #1a0f1a;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #3a1a3a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #f3e5f5;
                    color: #2a1a2a;
                }
                .torrent-serial {
                    background-color: rgba(198, 120, 221, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(198, 120, 221, 0.28);
                }
                .iptv-channel {
                    background-color: #5a3c5a !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #f5e6ff !important;
                    opacity: 0.9;
                }
            `,
            copper_blaze: `
                body {
                    background-color: #3d2614;
                    color: #ffefe0;
                }
                body.black--style {
                    background: #28180c;
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
                    background: linear-gradient(to right, #ffb74d 1%, #e65100 100%);
                    color: #3d2614;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #ffefe0;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a2a14 1%, #2a180a 100%);
                }
                .settings-input__links {
                    background-color: rgba(255, 183, 77, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ffcc80;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ffcc80 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ffa726;
                }
                .extensions {
                    background: #2a180c;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #4a2a14;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #ffe0b2;
                    color: #3d2614;
                }
                .torrent-serial {
                    background-color: rgba(255, 183, 77, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 183, 77, 0.28);
                }
                .iptv-channel {
                    background-color: #6b4a28 !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #ffefe0 !important;
                    opacity: 0.9;
                }
            `,
            arctic_sky: `
                body {
                    background-color: #0f2a3a;
                    color: #e1f5fe;
                }
                body.black--style {
                    background: #091c26;
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
                    background: linear-gradient(to right, #80d8ff 1%, #0091ea 100%);
                    color: #0f2a3a;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #e1f5fe;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #1a3a4a 1%, #0a1a26 100%);
                }
                .settings-input__links {
                    background-color: rgba(128, 216, 255, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #b3e5fc;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #b3e5fc !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #4fc3f7;
                }
                .extensions {
                    background: #0a1c26;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #1a3a4a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #b3e5fc;
                    color: #0f2a3a;
                }
                .torrent-serial {
                    background-color: rgba(128, 216, 255, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(128, 216, 255, 0.28);
                }
                .iptv-channel {
                    background-color: #2a506b !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #e1f5fe !important;
                    opacity: 0.9;
                }
            `,
            blood_moon: `
                body {
                    background-color: #3a0f1a;
                    color: #ffebee;
                }
                body.black--style {
                    background: #260912;
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
                    background: linear-gradient(to right, #ff5252 1%, #b71c1c 100%);
                    color: #3a0f1a;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #ffebee;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a1a1a 1%, #2a0a0a 100%);
                }
                .settings-input__links {
                    background-color: rgba(255, 82, 82, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ff8a80;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ff8a80 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ff1744;
                }
                .extensions {
                    background: #2a0a0a;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #4a1a1a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #ffcdd2;
                    color: #3a0f1a;
                }
                .torrent-serial {
                    background-color: rgba(255, 82, 82, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 82, 82, 0.28);
                }
                .iptv-channel {
                    background-color: #6b2a2a !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #ffebee !important;
                    opacity: 0.9;
                }
            `,
            cosmic_gold: `
                body {
                    background-color: #332a0f;
                    color: #fffde7;
                }
                body.black--style {
                    background: #221c09;
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
                    background: linear-gradient(to right, #ffd600 1%, #ff6d00 100%);
                    color: #332a0f;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #fffde7;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a3a0f 1%, #2a1c09 100%);
                }
                .settings-input__links {
                    background-color: rgba(255, 214, 0, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ffee58;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ffee58 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ffc400;
                }
                .extensions {
                    background: #2a1c09;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #4a3a0f;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #fff59d;
                    color: #332a0f;
                }
                .torrent-serial {
                    background-color: rgba(255, 214, 0, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 214, 0, 0.28);
                }
                .iptv-channel {
                    background-color: #6b5a1c !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #fffde7 !important;
                    opacity: 0.9;
                }
            `,
            mystic_plum: `
                body {
                    background-color: #2a0f2a;
                    color: #f3e5f5;
                }
                body.black--style {
                    background: #1c091c;
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
                    background: linear-gradient(to right, #ea80fc 1%, #9c27b0 100%);
                    color: #f3e5f5;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #f3e5f5;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #3a0f3a 1%, #1c091c 100%);
                }
                .settings-input__links {
                    background-color: rgba(234, 128, 252, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #e1bee7;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #e1bee7 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ce93d8;
                }
                .extensions {
                    background: #1c091c;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #3a0f3a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #f3e5f5;
                    color: #2a0f2a;
                }
                .torrent-serial {
                    background-color: rgba(234, 128, 252, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(234, 128, 252, 0.28);
                }
                .iptv-channel {
                    background-color: #5a1c5a !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #f3e5f5 !important;
                    opacity: 0.9;
                }
            `,
            steel_blue: `
                body {
                    background-color: #1a2a3a;
                    color: #e3f2fd;
                }
                body.black--style {
                    background: #0f1c26;
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
                    background: linear-gradient(to right, #90caf9 1%, #1565c0 100%);
                    color: #1a2a3a;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #e3f2fd;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #2a3a4a 1%, #0f1a26 100%);
                }
                .settings-input__links {
                    background-color: rgba(144, 202, 249, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #bbdefb;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #bbdefb !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #64b5f6;
                }
                .extensions {
                    background: #0f1a26;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #2a3a4a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #bbdefb;
                    color: #1a2a3a;
                }
                .torrent-serial {
                    background-color: rgba(144, 202, 249, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(144, 202, 249, 0.28);
                }
                .iptv-channel {
                    background-color: #3a4a6b !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #e3f2fd !important;
                    opacity: 0.9;
                }
            `,
            amber_night: `
                body {
                    background-color: #3a2a0f;
                    color: #fff8e1;
                }
                body.black--style {
                    background: #261c09;
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
                    background: linear-gradient(to right, #ffc107 1%, #ff8f00 100%);
                    color: #3a2a0f;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #fff8e1;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a3a0f 1%, #2a1c09 100%);
                }
                .settings-input__links {
                    background-color: rgba(255, 193, 7, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ffecb3;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ffecb3 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ffb300;
                }
                .extensions {
                    background: #2a1c09;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #4a3a0f;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #ffecb3;
                    color: #3a2a0f;
                }
                .torrent-serial {
                    background-color: rgba(255, 193, 7, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 193, 7, 0.28);
                }
                .iptv-channel {
                    background-color: #6b5a1c !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #fff8e1 !important;
                    opacity: 0.9;
                }
            `,
            velvet_rose: `
                body {
                    background-color: #3a1a1a;
                    color: #ffebee;
                }
                body.black--style {
                    background: #261010;
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
                    background: linear-gradient(to right, #ff8a80 1%, #d50000 100%);
                    color: #3a1a1a;
                }
                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }
                .settings-param-title > span {
                    color: #ffebee;
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a1a1a 1%, #2a0a0a 100%);
                }
                .settings-input__links {
                    background-color: rgba(255, 138, 128, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ffcdd2;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ffcdd2 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ff5252;
                }
                .extensions {
                    background: #2a0a0a;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #4a1a1a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #ffebee;
                    color: #3a1a1a;
                }
                .torrent-serial {
                    background-color: rgba(255, 138, 128, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 138, 128, 0.28);
                }
                .iptv-channel {
                    background-color: #6b2a2a !important;
                }
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #ffebee !important;
                    opacity: 0.9;
                }
            `,
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
    // Удаляем предыдущие стили шрифтов
    $('#interface_mod_font').remove();

    if (font === 'system') return; // Используем системный шрифт

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

        // Тематические (из фильмов)
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
  function applyLoader(loaderName) {
        $('#custom_loader_style').remove();
        if (loaderName === 'default') return;

        const loader = loaderStyles[loaderName] || loaderStyles.default;
        const svgCode = encodeURIComponent(loader.svg.replace('#COLOR#', loader.color));

        const style = $(`<style id="custom_loader_style">
            .loader__content::before {
                content: url("data:image/svg+xml,${svgCode}");
                display: block;
                margin: 0 auto;
                width: 100%;
                height: 100px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
            }
        </style>`);

        $('head').append(style);
    }

 function startPlugin() {
        // Загрузка сохраненных настроек
        InterFaceMod.settings = {
            theme: Lampa.Storage.get('theme_select', 'default'),
            font: Lampa.Storage.get('font_select', 'system'),
            loader: Lampa.Storage.get('loader_style', 'default')
        };

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

        // Добавляем выбор шрифта (НОВЫЙ БЛОК)
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
           component: 'theme_mod',
            param: {
                name: 'loader_style',
                type: 'select',
                values: Object.fromEntries(
                    Object.entries(loaderStyles).map(([key, value]) => [key, value.name])
                ),
                default: 'default'
            },
            field: {
                name: 'Стиль загрузки',
                description: 'Выберите анимацию при загрузке'
            },
            onChange: function (value) {
                InterFaceMod.settings.loader = value;
                Lampa.Storage.set('loader_style', value);
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
        description: 'Тема оформления и шрифты для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
