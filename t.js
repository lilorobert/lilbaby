(function () {
    'use strict';

    function startMe() {
        var styles = `
            body {
                background: linear-gradient(to bottom right, #ffeaf4, #dfffe3);
                color: #3a2d2d;
                font-family: 'Arial', sans-serif;
            }

            body.black--style {
                background: linear-gradient(to bottom right, #f6f0ff, #fff0f0);
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
                background: linear-gradient(to right, #ffb6c1, #ffe4e1);
                color: #000;
                box-shadow: 0 0 10px rgba(255, 182, 193, 0.4);
            }

            .settings-folder.focus .settings-folder__icon {
                filter: invert(0.5);
            }

            .settings-param-title > span {
                color: #222;
            }

            .settings__content,
            .settings-input__content,
            .selectbox__content,
            .modal__content {
                background: rgba(255, 255, 255, 0.85);
                border: 1px solid rgba(255, 182, 193, 0.3);
                box-shadow: 0 0 30px rgba(255, 182, 193, 0.2);
            }

            .settings-input__links {
                background-color: rgba(255, 255, 255, 0.2);
            }

            .card.focus .card__view::after,
            .card.hover .card__view::after,
            .extensions__item.focus:after,
            .torrent-item.focus::after,
            .extensions__block-add.focus:after {
                border-color: #ffb6c1;
            }

            .online-prestige.focus::after,
            .iptv-channel.focus::before,
            .iptv-channel.last--focus::before {
                border-color: #ffb6c1 !important;
            }

            .time-line > div,
            .player-panel__position,
            .player-panel__position > div:after {
                background-color: #ffb6c1;
            }

            .extensions {
                background: #fff0f0;
            }

            .extensions__item,
            .extensions__block-add {
                background-color: #ffe6ea;
            }

            .torrent-item__size,
            .torrent-item__exe,
            .torrent-item__viewed,
            .torrent-serial__size {
                background-color: #ffcad4;
                color: #000;
            }

            .torrent-serial {
                background-color: rgba(255, 203, 213, 0.15);
            }

            .torrent-file.focus,
            .torrent-serial.focus {
                background-color: rgba(255, 203, 213, 0.35);
            }

            .iptv-channel {
                background-color: #ffd1dc !important;
            }

            /* Бабочки */
            .butterfly {
                position: fixed;
                width: 40px;
                height: 40px;
                background-image: url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSJwaW5rIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzg0IDI1NmMwLTYwLTYwLTEwOC0xMjgtOTMtNTYgMTItMTA4IDUwLTExMiAxMGMtNSA2Ni00MCAxMzUtODggMTYyLTM4IDIxLTgxIDMzLTEyNiAzMy00MiAwLTgyLTEwLTExOC0yOGwtMjcgMjcgMjggMjhjMjYgMjYgNTYgNDQgOTAgNTMgNzAgMTggMTQ0LTUgMTk2LTYzIDM4LTQ0IDYwLTk2IDYwLTE1MXptLTY0IDBjMC00NC0zNi04MC04MC04MHMtODAgMzYtODAgODAgMzYgODAgODAgODAgODAtMzYgODAtODB6Ii8+PC9zdmc+");
                background-size: contain;
                background-repeat: no-repeat;
                animation: flutter 14s linear infinite;
                opacity: 0.8;
                z-index: 9999;
                pointer-events: none;
            }

            @keyframes flutter {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(20vw, -10vh) rotate(15deg); }
                50% { transform: translate(40vw, 10vh) rotate(-15deg); }
                75% { transform: translate(60vw, -5vh) rotate(10deg); }
                100% { transform: translate(80vw, 0vh) rotate(0deg); }
            }
        `;

        var styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Добавляем бабочек
        for (let i = 0; i < 5; i++) {
            const butterfly = document.createElement('div');
            butterfly.classList.add('butterfly');
            butterfly.style.top = Math.random() * 80 + 'vh';
            butterfly.style.left = Math.random() * 90 + 'vw';
            butterfly.style.animationDelay = (Math.random() * 10) + 's';
            document.body.appendChild(butterfly);
        }
    }

    if (window.appready) startMe();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') {
                startMe();
            }
        });
    }
})();
