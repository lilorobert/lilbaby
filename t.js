(function () {
    'use strict';

    function startMe() {
        var styles = `
            body {
                background-color: #0b0f2b;
                color: #e0f0ff;
            }

            body.black--style {
                background: #070a1a;
            }

            .card__vote {
                color: #a5b8d0;
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
                background: linear-gradient(to right, #1e3c72, #2a5298);
                color: #ffffff;
                box-shadow: 0 0 15px rgba(42, 82, 152, 0.5);
            }

            .settings-folder.focus .settings-folder__icon {
                filter: brightness(1.5);
            }

            .settings-param-title > span {
                color: #ffffff;
            }

            .settings__content,
            .settings-input__content,
            .selectbox__content,
            .modal__content {
                background: linear-gradient(135deg, #1c1f38 0%, #0e101f 100%);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }

            .settings-input__links {
                background-color: rgba(255, 255, 255, 0.05);
            }

            .card.focus .card__view::after, 
            .card.hover .card__view::after,
            .extensions__item.focus:after,
            .torrent-item.focus::after,
            .extensions__block-add.focus:after {
                border-color: #4a6edb;
            }

            .online-prestige.focus::after,
            .iptv-channel.focus::before, 
            .iptv-channel.last--focus::before {
                border-color: #4a6edb !important;
            }

            .time-line > div,
            .player-panel__position,
            .player-panel__position > div:after {
                background-color: #4a6edb;
            }

            .extensions {
                background: #0e101f;
            }

            .extensions__item,
            .extensions__block-add {
                background-color: #1b1e35;
            }

            .torrent-item__size,
            .torrent-item__exe,
            .torrent-item__viewed,
            .torrent-serial__size {
                background-color: #e0f0ff;
                color: #000;
            }

            .torrent-serial {
                background-color: rgba(224, 240, 255, 0.05);
            }

            .torrent-file.focus,
            .torrent-serial.focus {
                background-color: rgba(224, 240, 255, 0.2);
            }

            .iptv-channel {
                background-color: #1b233a !important;
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
