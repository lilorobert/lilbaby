(function () {
    'use strict';

    // Основной объект плагина
    var InterFaceMod = {
        // Название плагина
        name: 'LampaColor',
        // Версия плагина
        version: '0.0.1',
        // Включить отладку
        debug: false,
        // Настройки по умолчанию
        settings: {
            enabled: true,
            theme: 'default', // По умолчанию используем стандартную тему
        }
    };

    // Функция для применения темы
    function applyTheme(theme) {
        // Удаляем предыдущие стили темы
        $('#interface_mod_theme').remove();

        // Если выбрано "Нет", просто удаляем стили
        if (theme === 'default') return;

        // Создаем новый стиль
        const style = $('<style id="interface_mod_theme"></style>');

        // Определяем стили для разных тем
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
            `,
            // Другие темы могут быть добавлены сюда
            default: `
                /* Здесь могут быть стили для стандартной темы */
            `
        };

        // Устанавливаем стили для выбранной темы
        style.html(themes[theme] || themes['default']);

        // Добавляем стиль в head
        $('head').append(style);
    }

    // Функция инициализации плагина
    function startPlugin() {
        // Применяем настройки
        applyTheme(InterFaceMod.settings.theme);
    }

    // Инициализация меню с выбором темы
    function createMenu() {
        Lampa.Menu.add({
            'id': 'interface_mod',
            'title': 'Интерфейс',
            'list': [
                {
                    'title': 'Тема',
                    'name': 'theme',
                    'type': 'select',
                    'values': ['default', 'barbie'], // Добавляем новую тему "barbie"
                    'value': InterFaceMod.settings.theme,
                    'change': function (value) {
                        InterFaceMod.settings.theme = value;
                        applyTheme(value);
                    }
                }
            ]
        });
    }

    // Ждем загрузки приложения и запускаем плагин
    if (window.appready) {
        startPlugin();
        createMenu(); // Создаем меню после инициализации плагина
    } else {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') {
                startPlugin();
                createMenu(); // Создаем меню при готовности приложения
            }
        });
    }

    // Экспортируем объект плагина для внешнего доступа
    window.season_info = InterFaceMod;
})();
