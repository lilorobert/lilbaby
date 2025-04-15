(function () {
    'use strict';

    function startMe() {
        var styles = `
            body {
                background-color: #fce4ec;
                color: #ffffff;
            }

            body.black--style {
                background: #f8bbd0;
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
                background: linear-gradient(to right, #f48fb1, #f06292);
                color: #ffffff;
                box-shadow: 0 0 10px rgba(240, 98, 146, 0.4);
            }

            .settings-folder.focus .settings-folder__icon {
                filter: brightness(1.1);
            }

            .settings-param-title > span {
                color: #ffffff;
            }

            .settings__content,
            .settings-input__content,
            .selectbox__content,
            .modal__content {
                background: rgba(248, 187, 208, 0.2); /* мягкий розовый с прозрачностью */
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #ffffff;
                backdrop-filter: blur(10px); /* эффект замутнённого стекла */
            }

            .settings-input__links {
                background-color: rgba(255, 255, 255, 0.1);
            }

            .card.focus .card__view::after, 
            .card.hover .card__view::after,
            .extensions__item.focus:after,
            .torrent-item.focus::after,
            .extensions__block-add.focus:after {
                border-color: #f48fb1;
            }

            .online-prestige.focus::after,
            .iptv-channel.focus::before, 
            .iptv-channel.last--focus::before {
                border-color: #f48fb1 !important;
            }

            .time-line > div,
            .player-panel__position,
            .player-panel__position > div:after {
                background-color: #f48fb1;
            }

            .extensions {
                background: #fce4ec;
            }

            .extensions__item,
            .extensions__block-add {
                background-color: #f8bbd0;
            }

            .torrent-item__size,
            .torrent-item__exe,
            .torrent-item__viewed,
            .torrent-serial__size {
                background-color: #fde0e8;
                color: #000;
            }

            .torrent-serial {
                background-color: rgba(252, 228, 236, 0.2);
            }

            .torrent-file.focus,
            .torrent-serial.focus {
                background-color: rgba(252, 228, 236, 0.35);
            }

            .iptv-channel {
                background-color: #f8bbd0 !important;
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
