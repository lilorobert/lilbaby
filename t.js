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
        $('#interface_mod_theme').remove();
        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            bywolf_mod: `
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
            `,
            forest_trail: `
                body {
                    background-color: #1e3b2a;
                    color: #e8f5e9;
                }
                body.black--style {
                    background: #14281e;
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
                    background: linear-gradient(to right, #81c784 1%, #2e7d32 100%);
                    color: #1a2e22;
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
                    background: linear-gradient(135deg, #2d4a3a 1%, #13261a 100%);
                }
                .settings-input__links {
                    background-color: rgba(129, 199, 132, 0.2);
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #a5d6a7;
                }
                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #a5d6a7 !important;
                }
                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #66bb6a;
                }
                .extensions {
                    background: #142e1e;
                }
                .extensions__item,
                .extensions__block-add {
                    background-color: #2d4a3a;
                }
                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #c8e6c9;
                    color: #1a2e22;
                }
                .torrent-serial {
                    background-color: rgba(129, 199, 132, 0.08);
                }
                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(129, 199, 132, 0.28);
                }
                .iptv-channel {
                    background-color: #3a6b4a !important;
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
                    color: #3e2723;
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
                    'ocean_depth': 'Глубины океана',
                    'forest_trail': 'Лесная тропа',
                    'golden_sun': 'Золотое солнце',
                    'royal_purple': 'Королевский пурпур',
                    'fire_glow': 'Огненное сияние',
                    'icy_wind': 'Ледяной ветер',
                    'midnight_city': 'Ночной город',
                    'desert_sand': 'Пустынные пески',
                    'neon_dream': 'Неоновая мечта',
                    'emerald_island': 'Изумрудный остров',
                    'twilight_sky': 'Сумеречное небо'
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
        description: 'Тема оформления для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
