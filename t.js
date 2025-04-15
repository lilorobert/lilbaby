(function () {
    'use strict';

    function startMe() {
        var styles = `
            body {
                background: linear-gradient(to bottom, #dfffe0, #ffffff);
                color: #3e3e3e;
                overflow: hidden; /* чтобы бабочки не прокручивались */
            }

            .menu__item.focus,
            .menu__item.hover,
            .settings-folder.focus,
            .settings-param.focus,
            .selectbox-item.focus,
            .full-start__button.focus,
            .full-descr__tag.focus,
            .head__action.focus,
            .player-panel .button.focus {
                background: linear-gradient(to right, #a8e6cf, #dcedc1);
                color: #2e2e2e;
                box-shadow: 0 0 15px rgba(168, 230, 207, 0.4);
            }

            .settings__content,
            .settings-input__content,
            .selectbox__content,
            .modal__content {
                background: rgba(255, 255, 255, 0.8);
                border: 1px solid rgba(168, 230, 207, 0.3);
                backdrop-filter: blur(6px);
                color: #2c2c2c;
            }

            .card__vote {
                color: #2e2e2e;
            }

            /* Анимированные бабочки */
            .butterfly {
                position: fixed;
                width: 30px;
                height: 30px;
                background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Butterfly_icon.svg/512px-Butterfly_icon.svg.png');
                background-size: cover;
                animation: flutter 15s linear infinite;
                opacity: 0.8;
                z-index: 9999;
            }

            @keyframes flutter {
                0% {
                    transform: translateX(0) translateY(0) rotate(0deg);
                }
                25% {
                    transform: translateX(100px) translateY(-50px) rotate(15deg);
                }
                50% {
                    transform: translateX(200px) translateY(0px) rotate(-15deg);
                }
                75% {
                    transform: translateX(100px) translateY(50px) rotate(15deg);
                }
                100% {
                    transform: translateX(0px) translateY(0px) rotate(0deg);
                }
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Добавим 5 бабочек
        for (let i = 0; i < 5; i++) {
            const butterfly = document.createElement('div');
            butterfly.classList.add('butterfly');
            butterfly.style.top = Math.random() * 90 + 'vh';
            butterfly.style.left = Math.random() * 90 + 'vw';
            butterfly.style.animationDuration = (10 + Math.random() * 10) + 's';
            butterfly.style.animationDelay = (Math.random() * 5) + 's';
            document.body.appendChild(butterfly);
        }
    }

    if (window.appready) startMe();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                startMe();
            }
        });
    }
})();
