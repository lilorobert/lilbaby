(function () {
    'use strict';

    function startMe() {
        var styles = `
            body {
                background: linear-gradient(to bottom right, #3b6e9d, #2f4755);
                color: #e0f0f6;
                font-family: 'Arial', sans-serif;
                overflow: hidden;
            }

            body.black--style {
                background: linear-gradient(to bottom right, #4a7a8c, #2f4755);
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
                background: linear-gradient(to right, #8e9f9e, #7b9fa3);
                color: #fff;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
            }

            .settings-folder.focus .settings-folder__icon {
                filter: invert(0.5);
            }

            .settings-param-title > span {
                color: #fff;
            }

            .settings__content,
            .settings-input__content,
            .selectbox__content,
            .modal__content {
                background: rgba(24, 37, 48, 0.9);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
            }

            .settings-input__links {
                background-color: rgba(255, 255, 255, 0.2);
            }

            .card.focus .card__view::after,
            .card.hover .card__view::after,
            .extensions__item.focus:after,
            .torrent-item.focus::after,
            .extensions__block-add.focus:after {
                border-color: #8e9f9e;
            }

            .online-prestige.focus::after,
            .iptv-channel.focus::before,
            .iptv-channel.last--focus::before {
                border-color: #8e9f9e !important;
            }

            .time-line > div,
            .player-panel__position,
            .player-panel__position > div:after {
                background-color: #8e9f9e;
            }

            .extensions {
                background: #2f4755;
            }

            .extensions__item,
            .extensions__block-add {
                background-color: #4b6b7b;
            }

            .torrent-item__size,
            .torrent-item__exe,
            .torrent-item__viewed,
            .torrent-serial__size {
                background-color: #6e868a;
                color: #fff;
            }

            .torrent-serial {
                background-color: rgba(110, 134, 138, 0.1);
            }

            .torrent-file.focus,
            .torrent-serial.focus {
                background-color: rgba(110, 134, 138, 0.35);
            }

            .iptv-channel {
                background-color: #4b7b84 !important;
            }

            /* Анимация дождя */
            .rain {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 999;
                overflow: hidden;
            }

            .rain-drop {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.8);
                width: 1px;
                height: 20px;
                animation: fall linear infinite;
                opacity: 0.8;
                transform: rotate(0deg);
                will-change: transform, opacity;
            }

            @keyframes fall {
                0% {
                    top: -20px;
                    transform: translateX(0);
                }
                100% {
                    top: 100vh;
                    transform: translateX(calc(10px * (random() - 0.5)));
                }
            }

            /* Плавное колебание капель */
            .rain-drop:nth-child(odd) {
                animation-duration: calc(1s + 2s * (random() * 2));
            }

            .rain-drop:nth-child(even) {
                animation-duration: calc(1s + 2s * (random() * 2));
                animation-delay: calc(-2s * (random() * 2));
            }
        `;

        var styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Добавляем дождевые капли
        var rain = document.createElement('div');
        rain.classList.add('rain');
        document.body.appendChild(rain);

        // Генерируем капли с случайными параметрами
        for (var i = 0; i < 150; i++) {
            var drop = document.createElement('div');
            drop.classList.add('rain-drop');
            drop.style.left = Math.random() * 100 + 'vw';
            drop.style.animationDuration = (Math.random() * 2 + 1) + 's'; // скорость падения капли
            drop.style.animationDelay = Math.random() * 5 + 's'; // случайная задержка
            rain.appendChild(drop);
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
