(function () {
    'use strict';

    function startMe() {
        var styles = `
            body {
                background-color: #ffe4ec;
                color: #ffffff;
            }

            body.black--style {
                background: #ffd6e8;
            }

            .card__vote {
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
                background: linear-gradient(to right, #ff92c2, #ffc0cb);
                color: #ffffff;
                box-shadow: 0 0 15px rgba(255, 145, 195, 0.5);
            }

            .settings-folder.focus .settings-folder__icon {
                filter: brightness(1.2);
            }

            .settings-param-title > span {
                color: #ffffff;
            }

            .settings__content,
            .settings-input__content,
            .selectbox__content,
            .modal__content {
                background: linear-gradient(135deg, #ffb6c1 0%, #ffc9d9 100%);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: #ffffff;
            }

            .settings-input__links {
                background-color: rgba(255, 255, 255, 0.15);
            }

            .card.focus .card__view::after, 
            .card.hover .card__view::after,
            .extensions__item.focus:after,
            .torrent-item.focus::after,
            .extensions__block-add.focus:after {
                border-color: #ff92c2;
            }

            .online-prestige.focus::after,
            .iptv-channel.focus::before, 
            .iptv-channel.last--focus::before {
                border-color: #ff92c2 !important;
            }

            .time-line > div,
            .player-panel__position,
            .player-panel__position > div:after {
                background-color: #ff92c2;
            }

            .extensions {
                background: #ffe4ec;
            }

            .extensions__item,
            .extensions__block-add {
                background-color: #ffc0cb;
            }

            .torrent-item__size,
            .torrent-item__exe,
            .torrent-item__viewed,
            .torrent-serial__size {
                background-color: #fff0f5;
                color: #000;
            }

            .torrent-serial {
                background-color: rgba(255, 182, 193, 0.1);
            }

            .torrent-file.focus,
            .torrent-serial.focus {
                background-color: rgba(255, 182, 193, 0.3);
            }

            .iptv-channel {
                background-color: #ffb6c1 !important;
            }
        `;

        var styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    };

    if (window.appready) startMe();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                startMe();
            }
        });
    }
})();
