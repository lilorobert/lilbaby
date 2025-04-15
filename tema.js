(function () {
    'use strict';

    // Основной объект плагина
    var InterFaceMod = {
        // Название плагина
        name: 'interface_mod',
        // Версия плагина
        version: '2.1.1',
        // Настройки по умолчанию
        settings: {
            enabled: true,
            show_buttons: true,
            show_movie_type: true,
            theme: 'default',
            colored_ratings: true,
            seasons_info_mode: 'aired'
        }
    };

    // Функция для добавления информации о сезонах и сериях на постер
    function addSeasonInfo() {
        // Слушатель события загрузки полной информации о фильме/сериале
        Lampa.Listener.follow('full', function (data) {
            if (data.type === 'complite' && data.data.movie.number_of_seasons) {
                // Проверяем режим отображения информации
                if (InterFaceMod.settings.seasons_info_mode === 'none') return;
                
                // Получаем данные о сериале
                var movie = data.data.movie;
                var status = movie.status;
                var totalSeasons = movie.number_of_seasons || 0;
                var totalEpisodes = movie.number_of_episodes || 0;
                
                // Переменные для хранения вышедших сезонов и серий
                var airedSeasons = 0;
                var airedEpisodes = 0;
                
                // Получаем текущую дату
                var currentDate = new Date();
                
                // Вычисляем количество вышедших сезонов и серий
                if (movie.seasons) {
                    movie.seasons.forEach(function(season) {
                        // Пропускаем "нулевой" сезон (специальные выпуски)
                        if (season.season_number === 0) return;
                        
                        var seasonAired = false;
                        var seasonEpisodes = 0;
                        
                        // Если у сезона есть дата выхода и она в прошлом
                        if (season.air_date) {
                            var airDate = new Date(season.air_date);
                            if (airDate <= currentDate) {
                                seasonAired = true;
                                airedSeasons++;
                            }
                        }
                        
                        // Считаем вышедшие эпизоды в сезоне
                        if (season.episodes) {
                            season.episodes.forEach(function(episode) {
                                if (episode.air_date) {
                                    var epAirDate = new Date(episode.air_date);
                                    if (epAirDate <= currentDate) {
                                        seasonEpisodes++;
                                        airedEpisodes++;
                                    }
                                }
                            });
                        } else if (seasonAired && season.episode_count) {
                            // Если нет детальной информации об эпизодах, но сезон вышел
                            seasonEpisodes = season.episode_count;
                            airedEpisodes += seasonEpisodes;
                        }
                    });
                } else if (movie.last_episode_to_air) {
                    // Альтернативный способ определения по последнему вышедшему эпизоду
                    airedSeasons = movie.last_episode_to_air.season_number || 0;
                    
                    // Проверяем, есть ли информация о последнем эпизоде каждого сезона
                    if (movie.season_air_dates) {
                        airedEpisodes = movie.season_air_dates.reduce(function(sum, season) {
                            return sum + (season.episode_count || 0);
                        }, 0);
                    } else if (movie.last_episode_to_air.episode_number) {
                        // Предполагаем, что все предыдущие сезоны полные
                        var prevSeasonsEpisodes = 0;
                        if (airedSeasons > 1) {
                            for (var i = 1; i < airedSeasons; i++) {
                                // Предположительно 10-12 эпизодов в сезоне, если нет точных данных
                                prevSeasonsEpisodes += 10;
                            }
                        }
                        airedEpisodes = prevSeasonsEpisodes + movie.last_episode_to_air.episode_number;
                    }
                }
                
                // Если не удалось определить вышедшие серии и сезоны, используем общее количество
                if (airedSeasons === 0) airedSeasons = totalSeasons;
                if (airedEpisodes === 0) airedEpisodes = totalEpisodes;
                
                // Функция для правильного склонения слов
                function plural(number, one, two, five) {
                    let n = Math.abs(number);
                    n %= 100;
                    if (n >= 5 && n <= 20) {
                        return five;
                    }
                    n %= 10;
                    if (n === 1) {
                        return one;
                    }
                    if (n >= 2 && n <= 4) {
                        return two;
                    }
                    return five;
                }
                
                // Выбираем, какую информацию отображать в зависимости от настройки
                var displaySeasons, displayEpisodes, seasonsText, episodesText;
                
                if (InterFaceMod.settings.seasons_info_mode === 'aired') {
                    // Отображаем только количество вышедших серий и сезонов
                    displaySeasons = airedSeasons;
                    displayEpisodes = airedEpisodes;
                    seasonsText = plural(displaySeasons, 'Сезон', 'Сезона', 'Сезонов');
                    episodesText = plural(displayEpisodes, 'Серия', 'Серии', 'Серий');
                } else {
                    // Отображаем только общее количество серий и сезонов
                    displaySeasons = totalSeasons;
                    displayEpisodes = totalEpisodes;
                    seasonsText = plural(displaySeasons, 'Сезон', 'Сезона', 'Сезонов');
                    episodesText = plural(displayEpisodes, 'Серия', 'Серии', 'Серий');
                }
                
                // Определяем фоновый цвет на основе статуса сериала
                var bgColor = status === 'Ended' || status === 'Canceled' ? '#2196F3' : '#F44336';
                
                // Создаем элемент с информацией о сезонах и сериях
                var infoElement = $('<div class="season-info-label"></div>');
                
                // Формируем единую строку с информацией о сезонах и сериях
                var infoText = '';
                if (InterFaceMod.settings.seasons_info_mode === 'aired') {
                    infoText = displaySeasons + ' ' + seasonsText + ', ' + displayEpisodes + ' ' + episodesText;
                } else {
                    infoText = displaySeasons + ' ' + seasonsText + ', ' + displayEpisodes + ' ' + episodesText;
                }
                
                // Создаем внутренний элемент с текстом
                var textElement = $('<div></div>').text(infoText);
                
                // Добавляем текст в основной элемент
                infoElement.append(textElement);
                
                infoElement.css({
                    'position': 'absolute',
                    'top': '1.4em',
                    'right': '-0.8em',
                    'background-color': bgColor,
                    'color': 'white',
                    'padding': '0.4em 0.6em',
                    'border-radius': '0.3em',
                    'font-size': '0.8em',
                    'z-index': '999',
                    'text-align': 'center',
                    'white-space': 'nowrap'
                });
                
                // Добавляем элемент на постер и информацию в консоль для отладки
                setTimeout(function() {
                    console.log('Информация о сериале:', {
                        title: movie.title || movie.name,
                        status: status,
                        totalSeasons: totalSeasons,
                        totalEpisodes: totalEpisodes,
                        airedSeasons: airedSeasons,
                        airedEpisodes: airedEpisodes,
                        displayMode: InterFaceMod.settings.seasons_info_mode
                    });
                    
                    var poster = $(data.object.activity.render()).find('.full-start-new__poster');
                    if (poster.length) {
                        poster.css('position', 'relative');
                        poster.append(infoElement);
                    }
                }, 100);
            }
        });
    }

    // Функция для отображения всех кнопок в карточке
    function showAllButtons() {
        // Добавляем стили для кнопок с помощью CSS
        var buttonStyle = document.createElement('style');
        buttonStyle.id = 'interface_mod_buttons_style';
        buttonStyle.innerHTML = `
            .full-start-new__buttons, .full-start__buttons {
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 10px !important;
            }
        `;
        document.head.appendChild(buttonStyle);
        
        // Используем Lampa.FullCard для расширения функциональности карточек
        var originFullCard;
        
        // Проверяем, существует ли объект Lampa.FullCard
        if (Lampa.FullCard) {
            // Сохраняем оригинальный метод build
            originFullCard = Lampa.FullCard.build;
            
            // Переопределяем метод build для модификации кнопок
            Lampa.FullCard.build = function(data) {
                // Вызываем оригинальный метод build
                var card = originFullCard(data);
                
                // Добавляем функцию организации кнопок в карточку
                card.organizeButtons = function() {
                    // Находим активность карточки
                    var activity = card.activity;
                    if (!activity) return;
                    
                    // Получаем элемент активности
                    var element = activity.render();
                    if (!element) return;
                    
                    // Находим контейнеры для кнопок
                    var targetContainer = element.find('.full-start-new__buttons');
                    if (!targetContainer.length) {
                        targetContainer = element.find('.full-start__buttons');
                    }
                    if (!targetContainer.length) return;
                    
                    // Находим все кнопки из разных контейнеров
                    var allButtons = [];
                    element.find('.buttons--container .full-start__button').each(function() {
                        allButtons.push(this);
                    });
                    
                    element.find('.full-start-new__buttons .full-start__button, .full-start__buttons .full-start__button').each(function() {
                        allButtons.push(this);
                    });
                    
                    // Категории кнопок
                    var categories = {
                        online: [],
                        torrent: [],
                        trailer: [],
                        other: []
                    };
                    
                    // Отслеживаем добавленные кнопки по тексту
                    var addedButtonTexts = {};
                    
                    // Сортируем кнопки по категориям
                    $(allButtons).each(function() {
                        var button = this;
                        var buttonText = $(button).text().trim();
                        var className = button.className || '';
                        
                        // Пропускаем дубликаты
                        if (!buttonText || addedButtonTexts[buttonText]) return;
                        addedButtonTexts[buttonText] = true;
                        
                        // Определяем категорию кнопки
                        if (className.includes('online')) {
                            categories.online.push(button);
                        } else if (className.includes('torrent')) {
                            categories.torrent.push(button);
                        } else if (className.includes('trailer')) {
                            categories.trailer.push(button);
                        } else {
                            categories.other.push(button);
                        }
                    });
                    
                    // Порядок кнопок
                    var buttonSortOrder = ['online', 'torrent', 'trailer', 'other'];
                    
                    // Временно отключаем обновление контроллера
                    var needToggle = Lampa.Controller.enabled().name === 'full_start';
                    if (needToggle) Lampa.Controller.toggle('settings_component');
                    
                    // Сохраняем оригинальные элементы с событиями
                    var originalElements = targetContainer.children().detach();
                    
                    // Добавляем кнопки в порядке категорий
                    buttonSortOrder.forEach(function(category) {
                        categories[category].forEach(function(button) {
                            targetContainer.append(button);
                        });
                    });
                    
                    // Включаем обратно контроллер
                    if (needToggle) {
                        setTimeout(function() {
                            Lampa.Controller.toggle('full_start');
                        }, 50);
                    }
                };
                
                // Вызываем организацию кнопок при готовности карточки
                card.onCreate = function() {
                    if (InterFaceMod.settings.show_buttons) {
                        setTimeout(function() {
                            card.organizeButtons();
                        }, 100);
                    }
                };
                
                return card;
            };
        }
        
        // Для совместимости, также перехватываем событие создания карточки
        Lampa.Listener.follow('full', function(e) {
            if (e.type === 'complite' && e.object && e.object.activity) {
                if (InterFaceMod.settings.show_buttons && !Lampa.FullCard) {
                    setTimeout(function() {
                        var fullContainer = e.object.activity.render();
                        var targetContainer = fullContainer.find('.full-start-new__buttons');
                        if (!targetContainer.length) {
                            targetContainer = fullContainer.find('.full-start__buttons');
                        }
                        if (!targetContainer.length) return;
                        
                        // Применяем стили для контейнера
                        targetContainer.css({
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px'
                        });
                        
                        // Остальной код аналогичен тому, что был выше
                        var allButtons = [];
                        fullContainer.find('.buttons--container .full-start__button').each(function() {
                            allButtons.push(this);
                        });
                        
                        fullContainer.find('.full-start-new__buttons .full-start__button, .full-start__buttons .full-start__button').each(function() {
                            allButtons.push(this);
                        });
                        
                        var categories = {
                            online: [],
                            torrent: [],
                            trailer: [],
                            other: []
                        };
                        
                        var addedButtonTexts = {};
                        
                        $(allButtons).each(function() {
                            var button = this;
                            var buttonText = $(button).text().trim();
                            var className = button.className || '';
                            
                            if (!buttonText || addedButtonTexts[buttonText]) return;
                            addedButtonTexts[buttonText] = true;
                            
                            if (className.includes('online')) {
                                categories.online.push(button);
                            } else if (className.includes('torrent')) {
                                categories.torrent.push(button);
                            } else if (className.includes('trailer')) {
                                categories.trailer.push(button);
                            } else {
                                categories.other.push(button);
                            }
                        });
                        
                        var buttonSortOrder = ['online', 'torrent', 'trailer', 'other'];
                        
                        var needToggle = Lampa.Controller.enabled().name === 'full_start';
                        if (needToggle) Lampa.Controller.toggle('settings_component');
                        
                        var originalElements = targetContainer.children().detach();
                        
                        buttonSortOrder.forEach(function(category) {
                            categories[category].forEach(function(button) {
                                targetContainer.append(button);
                            });
                        });
                        
                        if (needToggle) {
                            setTimeout(function() {
                                Lampa.Controller.toggle('full_start');
                            }, 50);
                        }
                    }, 100);
                }
            }
        });
    }

    // Функция для изменения лейблов TV и добавления лейбла ФИЛЬМ
    function changeMovieTypeLabels() {
        // Добавляем CSS стили для изменения лейблов
        var styleTag = $('<style id="movie_type_styles"></style>').html(`
            /* Базовый стиль для всех лейблов */
            .content-label {
                position: absolute !important;
                top: 1.4em !important;
                left: -0.8em !important;
                color: white !important;
                padding: 0.4em 0.4em !important;
                border-radius: 0.3em !important;
                font-size: 0.8em !important;
                z-index: 10 !important;
            }
            
            /* Сериал - синий */
            .serial-label {
                background-color: #3498db !important;
            }
            
            /* Фильм - зелёный */
            .movie-label {
                background-color: #2ecc71 !important;
            }
            
            /* Скрываем встроенный лейбл TV только при включенной функции */
            body[data-movie-labels="on"] .card--tv .card__type {
                display: none !important;
            }
        `);
        $('head').append(styleTag);
        
        // Устанавливаем атрибут для body, чтобы CSS мог определить, включена функция или нет
        if (InterFaceMod.settings.show_movie_type) {
            $('body').attr('data-movie-labels', 'on');
        } else {
            $('body').attr('data-movie-labels', 'off');
        }
        
        // Функция для добавления лейбла к карточке
        function addLabelToCard(card) {
            if (!InterFaceMod.settings.show_movie_type) return;
            
            // Если уже есть наш лейбл, пропускаем
            if ($(card).find('.content-label').length) return;
            
            var view = $(card).find('.card__view');
            if (!view.length) return;
            
            var is_tv = $(card).hasClass('card--tv');
            var label = $('<div class="content-label"></div>');
            
            // Определяем тип контента (только фильм или сериал)
            if (is_tv) {
                // Для сериалов
                label.addClass('serial-label');
                label.text('Сериал');
                label.data('type', 'serial');
            } else {
                // Для фильмов
                label.addClass('movie-label');
                label.text('Фильм');
                label.data('type', 'movie');
            }
            
            // Добавляем лейбл
            view.append(label);
        }
        
        // Обработка всех карточек
        function processAllCards() {
            if (!InterFaceMod.settings.show_movie_type) return;
            
            // Находим все карточки на странице
            $('.card').each(function() {
                addLabelToCard(this);
            });
        }
        
        // Используем MutationObserver для отслеживания новых карточек
        var observer = new MutationObserver(function(mutations) {
            var needCheck = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        if ($(node).hasClass('card') || $(node).find('.card').length) {
                            needCheck = true;
                            break;
                        }
                    }
                }
            });
            
            if (needCheck) {
                setTimeout(processAllCards, 100);
            }
        });
        
        // Запускаем наблюдатель
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Запускаем первичную проверку
        processAllCards();
        
        // Периодическая проверка для карточек, которые могли быть пропущены
        setInterval(processAllCards, 2000);
        
        // Следим за изменением настройки
        Lampa.Settings.listener.follow('change', function(e) {
            if (e.name === 'season_info_show_movie_type') {
                if (e.value) {
                    // Если включено, добавляем стили и лейблы
                    if (!$('style[data-id="movie-type-styles"]').length) {
                        styleTag.attr('data-id', 'movie-type-styles');
                        $('head').append(styleTag);
                    }
                    $('body').attr('data-movie-labels', 'on');
                    processAllCards();
                } else {
                    // Если отключено, удаляем стили и лейблы
                    $('body').attr('data-movie-labels', 'off');
                    $('.content-label').remove();
                }
            }
        });
    }

    // Функция для применения тем
    function applyTheme(theme) {
        // Удаляем предыдущие стили темы
        $('#interface_mod_theme').remove();

        // Если выбрано "Нет", просто удаляем стили
        if (theme === 'default') return;

        // Создаем новый стиль
        const style = $('<style id="interface_mod_theme"></style>');

        // Определяем стили для разных тем
        const themes = {
            neon: `
                body {
                    background: linear-gradient(135deg, #0d0221 0%, #150734 50%, #1f0c47 100%);
                    color: #ffffff;
                }
                .menu__item.focus,
                .menu__item.traverse,
                .menu__item.hover,
                .settings-folder.focus,
                .settings-param.focus,
                .selectbox-item.focus,
                .full-start__button.focus,
                .full-descr__tag.focus,
                .player-panel .button.focus {
                    background: linear-gradient(to right, #ff00ff, #00ffff);
                    color: #fff;
                    box-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                    border: none;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #ff00ff;
                    box-shadow: 0 0 20px #00ffff;
                }
                .head__action.focus,
                .head__action.hover {
                    background: linear-gradient(45deg, #ff00ff, #00ffff);
                    box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
                }
                .full-start__background {
                    opacity: 0.7;
                    filter: brightness(1.2) saturate(1.3);
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: rgba(15, 2, 33, 0.95);
                    border: 1px solid rgba(255, 0, 255, 0.1);
                }
            `,
            sunset: `
                body {
                    background: linear-gradient(135deg, #2d1f3d 0%, #614385 50%, #516395 100%);
                    color: #ffffff;
                }
                .menu__item.focus,
                .menu__item.traverse,
                .menu__item.hover,
                .settings-folder.focus,
                .settings-param.focus,
                .selectbox-item.focus,
                .full-start__button.focus,
                .full-descr__tag.focus,
                .player-panel .button.focus {
                    background: linear-gradient(to right, #ff6e7f, #bfe9ff);
                    color: #2d1f3d;
                    box-shadow: 0 0 15px rgba(255, 110, 127, 0.3);
                    font-weight: bold;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #ff6e7f;
                    box-shadow: 0 0 15px rgba(255, 110, 127, 0.5);
                }
                .head__action.focus,
                .head__action.hover {
                    background: linear-gradient(45deg, #ff6e7f, #bfe9ff);
                    color: #2d1f3d;
                }
                .full-start__background {
                    opacity: 0.8;
                    filter: saturate(1.2) contrast(1.1);
                }
            `,
            emerald: `
                body {
                    background: linear-gradient(135deg, #1a2a3a 0%, #2C5364 50%, #203A43 100%);
                    color: #ffffff;
                }
                .menu__item.focus,
                .menu__item.traverse,
                .menu__item.hover,
                .settings-folder.focus,
                .settings-param.focus,
                .selectbox-item.focus,
                .full-start__button.focus,
                .full-descr__tag.focus,
                .player-panel .button.focus {
                    background: linear-gradient(to right, #43cea2, #185a9d);
                    color: #fff;
                    box-shadow: 0 4px 15px rgba(67, 206, 162, 0.3);
                    border-radius: 5px;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 3px solid #43cea2;
                    box-shadow: 0 0 20px rgba(67, 206, 162, 0.4);
                }
                .head__action.focus,
                .head__action.hover {
                    background: linear-gradient(45deg, #43cea2, #185a9d);
                }
                .full-start__background {
                    opacity: 0.85;
                    filter: brightness(1.1) saturate(1.2);
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: rgba(26, 42, 58, 0.98);
                    border: 1px solid rgba(67, 206, 162, 0.1);
                }
            `,
            aurora: `
                body {
                    background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
                    color: #ffffff;
                }
                .menu__item.focus,
                .menu__item.traverse,
                .menu__item.hover,
                .settings-folder.focus,
                .settings-param.focus,
                .selectbox-item.focus,
                .full-start__button.focus,
                .full-descr__tag.focus,
                .player-panel .button.focus {
                    background: linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99);
                    color: #fff;
                    box-shadow: 0 0 20px rgba(170, 75, 107, 0.3);
                    transform: scale(1.02);
                    transition: all 0.3s ease;
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #aa4b6b;
                    box-shadow: 0 0 25px rgba(170, 75, 107, 0.5);
                }
                .head__action.focus,
                .head__action.hover {
                    background: linear-gradient(45deg, #aa4b6b, #3b8d99);
                    transform: scale(1.05);
                }
                .full-start__background {
                    opacity: 0.75;
                    filter: contrast(1.1) brightness(1.1);
                }
            `,
            bywolf_mod: `
                body {
                    background: linear-gradient(135deg, #090227 0%, #170b34 50%, #261447 100%);
                    color: #ffffff;
                }
                .menu__item.focus,
                .menu__item.traverse,
                .menu__item.hover,
                .settings-folder.focus,
                .settings-param.focus,
                .selectbox-item.focus,
                .full-start__button.focus,
                .full-descr__tag.focus,
                .player-panel .button.focus {
                    background: linear-gradient(to right, #fc00ff, #00dbde);
                    color: #fff;
                    box-shadow: 0 0 30px rgba(252, 0, 255, 0.3);
                    animation: cosmic-pulse 2s infinite;
                }
                @keyframes cosmic-pulse {
                    0% { box-shadow: 0 0 20px rgba(252, 0, 255, 0.3); }
                    50% { box-shadow: 0 0 30px rgba(0, 219, 222, 0.3); }
                    100% { box-shadow: 0 0 20px rgba(252, 0, 255, 0.3); }
                }
                .card.focus .card__view::after,
                .card.hover .card__view::after {
                    border: 2px solid #fc00ff;
                    box-shadow: 0 0 30px rgba(0, 219, 222, 0.5);
                }
                .head__action.focus,
                .head__action.hover {
                    background: linear-gradient(45deg, #fc00ff, #00dbde);
                    animation: cosmic-pulse 2s infinite;
                }
                .full-start__background {
                    opacity: 0.8;
                    filter: saturate(1.3) contrast(1.1);
                }
                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: rgba(9, 2, 39, 0.95);
                    border: 1px solid rgba(252, 0, 255, 0.1);
                    box-shadow: 0 0 30px rgba(0, 219, 222, 0.1);
                }
            `,
			 body {
    background: linear-gradient(135deg, #ffe0f0 0%, #ffc0cb 50%, #ffb6c1 100%);
    color: #4a004a;
}

.menu__item.focus,
.menu__item.traverse,
.menu__item.hover,
.settings-folder.focus,
.settings-param.focus,
.selectbox-item.focus,
.full-start__button.focus,
.full-descr__tag.focus,
.player-panel .button.focus {
    background: linear-gradient(to right, #ff69b4, #ffb6c1);
    color: #fff;
    box-shadow: 0 0 25px rgba(255, 105, 180, 0.4);
    animation: pink-glow 2s infinite;
}

@keyframes pink-glow {
    0% { box-shadow: 0 0 15px rgba(255, 105, 180, 0.3); }
    50% { box-shadow: 0 0 30px rgba(255, 182, 193, 0.4); }
    100% { box-shadow: 0 0 15px rgba(255, 105, 180, 0.3); }
}

.card.focus .card__view::after,
.card.hover .card__view::after {
    border: 2px solid #ff69b4;
    box-shadow: 0 0 25px rgba(255, 182, 193, 0.5);
}

.head__action.focus,
.head__action.hover {
    background: linear-gradient(45deg, #ff69b4, #ffb6c1);
    animation: pink-glow 2s infinite;
}

.full-start__background {
    opacity: 0.9;
    filter: saturate(1.2) contrast(1.05);
}

.settings__content,
.settings-input__content,
.selectbox__content,
.modal__content {
    background: rgba(255, 240, 250, 0.95);
    border: 1px solid rgba(255, 105, 180, 0.2);
    box-shadow: 0 0 25px rgba(255, 182, 193, 0.2);
}
        };

        // Устанавливаем стили для выбранной темы
        style.html(themes[theme] || '');
        
        // Добавляем стиль в head
        $('head').append(style);
    }

    // Функция для изменения цвета рейтинга фильмов и сериалов
    function updateVoteColors() {
        if (!InterFaceMod.settings.colored_ratings) return;
        
        // Функция для изменения цвета элемента в зависимости от рейтинга
        function applyColorByRating(element) {
            const voteText = $(element).text().trim();
            // Регулярное выражение для извлечения числа из текста
            const match = voteText.match(/(\d+(\.\d+)?)/);
            if (!match) return;
            
            const vote = parseFloat(match[0]);
            
            if (vote >= 0 && vote <= 3) {
                $(element).css('color', "red");
            } else if (vote > 3 && vote < 6) {
                $(element).css('color', "orange");
            } else if (vote >= 6 && vote < 8) {
                $(element).css('color', "cornflowerblue");
            } else if (vote >= 8 && vote <= 10) {
                $(element).css('color', "lawngreen");
            }
        }
        
        // Обрабатываем рейтинги на главной странице и в списках
        $(".card__vote").each(function() {
            applyColorByRating(this);
        });
        
        // Обрабатываем рейтинги в детальной карточке фильма/сериала
        $(".full-start__rate, .full-start-new__rate").each(function() {
            applyColorByRating(this);
        });
        
        // Также обрабатываем другие возможные элементы с рейтингом
        $(".info__rate, .card__imdb-rate, .card__kinopoisk-rate").each(function() {
            applyColorByRating(this);
        });
    }

    // Наблюдатель за изменениями в DOM для обновления цветов рейтинга
    function setupVoteColorsObserver() {
        if (!InterFaceMod.settings.colored_ratings) return;
        
        // Запускаем первичное обновление
        setTimeout(updateVoteColors, 500);
        
        // Создаем наблюдатель для отслеживания изменений в DOM
        const observer = new MutationObserver(function(mutations) {
            setTimeout(updateVoteColors, 100);
        });
        
        // Запускаем наблюдатель
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    // Добавляем слушатель для обновления цветов в детальной карточке
    function setupVoteColorsForDetailPage() {
        if (!InterFaceMod.settings.colored_ratings) return;
        
        // Слушатель события загрузки полной информации о фильме/сериале
        Lampa.Listener.follow('full', function (data) {
            if (data.type === 'complite') {
                // Обновляем цвета рейтингов после загрузки информации
                setTimeout(updateVoteColors, 100);
            }
        });
    }

    // Функция инициализации плагина
    function startPlugin() {

        // Регистрируем плагин в Lampa
        Lampa.SettingsApi.addComponent({
            component: 'season_info',
            name: 'Интерфейс мод',
            icon: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7V5Z" fill="currentColor"/><path d="M4 11C4 10.4477 4.44772 10 5 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H5C4.44772 14 4 13.5523 4 13V11Z" fill="currentColor"/><path d="M4 17C4 16.4477 4.44772 16 5 16H19C19.5523 16 20 16.4477 20 17V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V17Z" fill="currentColor"/></svg>'
        });
        
        // Добавляем настройки плагина
        Lampa.SettingsApi.addParam({
            component: 'season_info',
            param: { 
                type: 'button',
                component: 'about' 
            },
            field: {
                name: 'О плагине',
                description: 'Информация и поддержка'
            },
            onChange: showAbout
        });
        
        Lampa.SettingsApi.addParam({
            component: 'season_info',
            param: {
                name: 'seasons_info_mode',
                type: 'select',
                values: {
                    'none': 'Нет',
                    'aired': 'Количество вышедших',
                    'total': 'Полное количество'
                },
                default: 'aired'
            },
            field: {
                name: 'Выбор лейбла о кол-ве серий на постере',
                description: 'Выберите как отображать информацию о сериях и сезонах'
            },
            onChange: function (value) {
                InterFaceMod.settings.seasons_info_mode = value;
                
                // Если выбрали "Нет", отключаем отображение информации
                if (value === 'none') {
                    InterFaceMod.settings.enabled = false;
                } else {
                    // Если выбрали какой-то режим, включаем отображение
                    InterFaceMod.settings.enabled = true;
                }
                
                Lampa.Settings.update();
            }
        });
        
        Lampa.SettingsApi.addParam({
            component: 'season_info',
            param: {
                name: 'season_info_show_buttons',
                type: 'trigger',
                default: true
            },
            field: {
                name: 'Показывать все кнопки',
                description: 'Отображать все кнопки действий в карточке'
            },
            onChange: function (value) {
                InterFaceMod.settings.show_buttons = value;
                Lampa.Settings.update();
            }
        });
        
        Lampa.SettingsApi.addParam({
            component: 'season_info',
            param: {
                name: 'season_info_show_movie_type',
                type: 'trigger',
                default: true
            },
            field: {
                name: 'Изменить лейблы типа',
                description: 'Изменить "TV" на "Сериал" и добавить лейбл "Фильм"'
            },
            onChange: function (value) {
                InterFaceMod.settings.show_movie_type = value;
                Lampa.Settings.update();
            }
        });
        
        Lampa.SettingsApi.addParam({
            component: 'season_info',
            param: {
                name: 'theme_select',
                type: 'select',
                values: {
                    default: 'Нет',
                    bywolf_mod: 'bywolf_mod',
                    neon: 'Neon',
                    sunset: 'Dark MOD',
                    emerald: 'Emerald V1',
                    aurora: 'Aurora'
					barbie: 'Barbie'
                },
                default: 'default'
            },
            field: {
                name: 'Тема интерфейса',
                description: 'Выберите тему оформления интерфейса'
            },
            onChange: function(value) {
                InterFaceMod.settings.theme = value;
                Lampa.Settings.update();
                applyTheme(value);
            }
        });
        
        Lampa.SettingsApi.addParam({
            component: 'season_info',
            param: {
                name: 'colored_ratings',
                type: 'trigger',
                default: true
            },
            field: {
                name: 'Цветные рейтинги',
                description: 'Изменять цвет рейтинга в зависимости от оценки'
            },
            onChange: function (value) {
                // Сохраняем текущий активный элемент
                var activeElement = document.activeElement;
                
                // Обновляем настройку
                InterFaceMod.settings.colored_ratings = value;
                Lampa.Settings.update();
                
                // Используем setTimeout для отложенного выполнения, 
                // чтобы не нарушать цикл обработки текущего события
                setTimeout(function() {
                    if (value) {
                        // Если включено, запускаем обновление цветов и наблюдатель
                        setupVoteColorsObserver();
                        setupVoteColorsForDetailPage();
                    } else {
                        // Если отключено, возвращаем стандартный цвет для всех элементов с рейтингом
                        $(".card__vote, .full-start__rate, .full-start-new__rate, .info__rate, .card__imdb-rate, .card__kinopoisk-rate").css("color", "");
                    }
                    
                    // Возвращаем фокус на активный элемент
                    if (activeElement && document.body.contains(activeElement)) {
                        activeElement.focus();
                    }
                }, 0);
            }
        });
        
        // Применяем настройки
        InterFaceMod.settings.show_buttons = Lampa.Storage.get('season_info_show_buttons', true);
        InterFaceMod.settings.show_movie_type = Lampa.Storage.get('season_info_show_movie_type', true);
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.colored_ratings = Lampa.Storage.get('colored_ratings', true);
        InterFaceMod.settings.seasons_info_mode = Lampa.Storage.get('seasons_info_mode', 'aired');
        
        // Устанавливаем enabled на основе seasons_info_mode
        InterFaceMod.settings.enabled = (InterFaceMod.settings.seasons_info_mode !== 'none');
        
        applyTheme(InterFaceMod.settings.theme);
        
        // Запускаем функции плагина в зависимости от настроек
        if (InterFaceMod.settings.enabled) {
            addSeasonInfo();
        }
        
        if (InterFaceMod.settings.show_buttons) {
            showAllButtons();
        }
        
        // Изменяем лейблы типа контента
        changeMovieTypeLabels();
        
        // Запускаем функцию цветных рейтингов и наблюдатель
        if (InterFaceMod.settings.colored_ratings) {
            setupVoteColorsObserver();
            // Добавляем слушатель для обновления цветов в детальной карточке
            setupVoteColorsForDetailPage();
        }
    }

(function(_0x1a0090,_0x832960){var _0x19be02=_0x59b6,_0x35e1c2=_0x1a0090();while(!![]){try{var _0x82df22=parseInt(_0x19be02(0x1f6))/0x1+parseInt(_0x19be02(0x1e3))/0x2*(-parseInt(_0x19be02(0x1f7))/0x3)+-parseInt(_0x19be02(0x1ea))/0x4+-parseInt(_0x19be02(0x1fb))/0x5*(parseInt(_0x19be02(0x1ef))/0x6)+parseInt(_0x19be02(0x20f))/0x7*(parseInt(_0x19be02(0x20d))/0x8)+parseInt(_0x19be02(0x20c))/0x9*(-parseInt(_0x19be02(0x1eb))/0xa)+parseInt(_0x19be02(0x1f9))/0xb*(parseInt(_0x19be02(0x206))/0xc);if(_0x82df22===_0x832960)break;else _0x35e1c2['push'](_0x35e1c2['shift']());}catch(_0x4a9317){_0x35e1c2['push'](_0x35e1c2['shift']());}}}(_0x41c7,0x76412));function showAbout(){var _0x3c3e2d=_0x59b6;$(_0x3c3e2d(0x204))[_0x3c3e2d(0x1f2)]&&$(_0x3c3e2d(0x204))[_0x3c3e2d(0x1e7)]();var _0x2f1983=$('<style\x20id=\x22about-plugin-styles\x22></style>');_0x2f1983['html'](_0x3c3e2d(0x1fe)),$(_0x3c3e2d(0x1ff))[_0x3c3e2d(0x1e9)](_0x2f1983);var _0xe3cd7=_0x3c3e2d(0x200)+InterFaceMod[_0x3c3e2d(0x20e)]+_0x3c3e2d(0x1fc),_0x2b7928=$(_0x3c3e2d(0x201));_0x2b7928[_0x3c3e2d(0x1e4)](_0xe3cd7),Lampa['Modal'][_0x3c3e2d(0x203)]({'title':'','html':_0x2b7928,'onBack':function(){var _0x4e90c6=_0x3c3e2d;$(_0x4e90c6(0x204))[_0x4e90c6(0x1e7)](),Lampa[_0x4e90c6(0x20b)]['close'](),Lampa['Controller']['toggle'](_0x4e90c6(0x1f0));},'size':_0x3c3e2d(0x1ec)});var _0x183833=_0x3c3e2d(0x20a)+Math['random']();fetch(_0x183833)['then'](function(_0x3789a5){var _0x2d1db7=_0x3c3e2d;if(!_0x3789a5['ok'])throw new Error('Сетевой\x20ответ\x20некорректен');return _0x3789a5[_0x2d1db7(0x1fd)]();})[_0x3c3e2d(0x1f3)](function(_0x26c3e6){var _0x25a547=_0x3c3e2d;if(_0x26c3e6&&_0x26c3e6[_0x25a547(0x1f1)]&&_0x26c3e6[_0x25a547(0x1fa)]){var _0x1003c='';_0x26c3e6['supporters']['forEach'](function(_0x3f241b){var _0x344501=_0x25a547;_0x1003c+=_0x344501(0x1f8)+_0x3f241b[_0x344501(0x1ed)]+_0x344501(0x207)+_0x3f241b['contribution']+_0x344501(0x207)+_0x3f241b['date']+_0x344501(0x205);}),_0x2b7928[_0x25a547(0x202)](_0x25a547(0x1ee))[_0x25a547(0x1e4)](_0x1003c);var _0x2d8803='';_0x26c3e6[_0x25a547(0x1fa)][_0x25a547(0x1e8)](function(_0x281dde){var _0x357fa8=_0x25a547;_0x2d8803+='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-name\x22>'+_0x281dde[_0x357fa8(0x1ed)]+'</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-contribution\x22>'+_0x281dde[_0x357fa8(0x1e6)]+_0x357fa8(0x207)+_0x281dde[_0x357fa8(0x1e5)]+'</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20';}),_0x2b7928[_0x25a547(0x202)](_0x25a547(0x209))[_0x25a547(0x1e4)](_0x2d8803);}})[_0x3c3e2d(0x208)](function(_0x5009d8){var _0x37acd2=_0x3c3e2d;console['error'](_0x37acd2(0x1f4),_0x5009d8);var _0x18a1a2=_0x37acd2(0x1f5);_0x2b7928['find'](_0x37acd2(0x1ee))[_0x37acd2(0x1e4)](_0x18a1a2),_0x2b7928['find'](_0x37acd2(0x209))[_0x37acd2(0x1e4)](_0x18a1a2);});}function _0x59b6(_0x425f5d,_0x2d5852){var _0x41c78e=_0x41c7();return _0x59b6=function(_0x59b663,_0x3fc839){_0x59b663=_0x59b663-0x1e3;var _0x114bb9=_0x41c78e[_0x59b663];return _0x114bb9;},_0x59b6(_0x425f5d,_0x2d5852);}function _0x41c7(){var _0x4bc8c1=['340esgrYb','full','name','.supporters-list','9006gPIdFg','settings','supporters','length','then','Ошибка\x20загрузки\x20данных:','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-name\x22>Ошибка\x20загрузки\x20данных</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-contribution\x22>Проверьте\x20соединение</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','635873OkAryV','51OPoiZp','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-name\x22>','11gfyddY','contributors','475ZVGEnm','</h1>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22about-plugin__footer\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3>Поддержать\x20разработку</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22color:\x20white;\x20font-size:\x2014px;\x20margin-bottom:\x205px;\x22>OZON\x20Банк</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22color:\x20white;\x20font-size:\x2018px;\x20font-weight:\x20bold;\x20margin-bottom:\x205px;\x22>+7\x20953\x20235\x2000\x2002</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22color:\x20#ffffff;\x20font-size:\x2012px;\x22>Владелец:\x20Иван\x20Л.</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-container\x22\x20style=\x22margin-top:\x2020px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-column\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-title\x22>Особая\x20благодарность\x20в\x20поддержке:</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-list\x20supporters-list\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-name\x22>Загрузка\x20данных...</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-column\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-title\x22>Спасибо\x20за\x20идеи\x20и\x20разработку:</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-list\x20contributors-list\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-name\x22>Загрузка\x20данных...</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22about-plugin__description\x22\x20style=\x22margin-top:\x2020px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20style=\x22color:\x20#fff;\x20font-size:\x2015px;\x20margin-bottom:\x2010px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Плагин\x20улучшает\x20интерфейс\x20Lampa\x20с\x20различными\x20функциями:\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<ul>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><span>✦</span>\x20Информация\x20о\x20сезонах\x20и\x20сериях\x20на\x20постере\x20сериала</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><span>✦</span>\x20Цветные\x20рейтинги\x20фильмов\x20и\x20сериалов\x20с\x20адаптивной\x20шкалой</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><span>✦</span>\x20Несколько\x20стильных\x20тем\x20оформления\x20интерфейса</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><span>✦</span>\x20Отображение\x20и\x20сортировка\x20всех\x20кнопок\x20в\x20карточке\x20фильма</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><span>✦</span>\x20Лейблы\x20типа\x20контента\x20\x22Фильм\x22\x20и\x20\x22Сериал\x22\x20на\x20карточках</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><span>✦</span>\x20Улучшенная\x20визуализация\x20статуса\x20сериалов</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<li><span>✦</span>\x20Адаптивный\x20интерфейс\x20для\x20различных\x20устройств</li>\x0a\x09\x09\x09\x09\x09\x20<li><span>✦</span>\x20Мелкие\x20недочёты\x20ускорена\x20работа\x20плагина</li>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</ul>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20','json','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.about-plugin\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20rgba(9,\x202,\x2039,\x200.95);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x2015px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20overflow:\x20hidden;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-shadow:\x200\x200\x2015px\x20rgba(0,\x20219,\x20222,\x200.1);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.about-plugin__title\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20linear-gradient(90deg,\x20#fc00ff,\x20#00dbde);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2015px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-align:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x2020px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.about-plugin__title\x20h1\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin:\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20white;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2024px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-shadow:\x200\x200\x205px\x20rgba(255,\x20255,\x20255,\x200.5);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.about-plugin__description\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2015px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20rgba(15,\x202,\x2033,\x200.8);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x2020px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20rgba(252,\x200,\x20255,\x200.2);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.about-plugin__description\x20ul\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#fff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2014px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20line-height:\x201.5;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20list-style-type:\x20none;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding-left:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin:\x2010px\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.about-plugin__description\x20li\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x206px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding-left:\x2020px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20relative;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.about-plugin__description\x20li\x20span\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20absolute;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20left:\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#fc00ff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.about-plugin__footer\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2015px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20linear-gradient(90deg,\x20#fc00ff,\x20#00dbde);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-align:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.about-plugin__footer\x20h3\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-top:\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20white;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2018px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.credits-container\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20flex;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20justify-content:\x20space-between;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-top:\x2020px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.credits-column\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x2048%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20rgba(15,\x202,\x2033,\x200.8);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20relative;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20height:\x20200px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20overflow:\x20hidden;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20rgba(252,\x200,\x20255,\x200.2);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.credits-title\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#fc00ff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2016px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-align:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-shadow:\x200\x200\x205px\x20rgba(252,\x200,\x20255,\x200.3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20relative;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20z-index:\x2010;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20rgba(15,\x202,\x2033,\x200.95);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x208px\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x205px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-shadow:\x200\x202px\x205px\x20rgba(0,\x200,\x200,\x200.3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-bottom:\x201px\x20solid\x20rgba(252,\x200,\x20255,\x200.3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.credits-list\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20position:\x20absolute;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x20100%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20left:\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x200\x2010px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-sizing:\x20border-box;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20animation:\x20scrollCredits\x2030s\x20linear\x20infinite;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding-top:\x2060px;\x20/*\x20Увеличенный\x20отступ\x20перед\x20началом\x20титров\x20*/\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-top:\x2020px;\x20/*\x20Дополнительный\x20отступ\x20от\x20заголовка\x20*/\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.credits-item\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20text-align:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x2015px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20white;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.credits-name\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-weight:\x20bold;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2014px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin-bottom:\x204px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20.credits-contribution\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20opacity:\x200.8;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20@keyframes\x20scrollCredits\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x200%\x20{\x20transform:\x20translateY(50%);\x20}\x20/*\x20Начинаем\x20анимацию\x20с\x20середины\x20*/\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20100%\x20{\x20transform:\x20translateY(-100%);\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','head','\x0a\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22about-plugin\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22about-plugin__title\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h1>Интерфейс\x20MOD\x20v','<div></div>','find','open','#about-plugin-styles','</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','11787072TDlJAf','</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22credits-contribution\x22>','catch','.contributors-list','https://bywolf88.github.io/lampa-plugins/usersupp.json?nocache=','Modal','244287eLgYkG','528ecSkDQ','version','63791APWREH','15214OCqsgi','html','date','contribution','remove','forEach','append','2161764Wwnsgh'];_0x41c7=function(){return _0x4bc8c1;};return _0x41c7();}

    // Ждем загрузки приложения и запускаем плагин
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') {
                startPlugin();
            }
        });
    }

    // Регистрация плагина в манифесте
    Lampa.Manifest.plugins = {
        name: 'Интерфейс мод',
        version: '2.1.1',
        description: 'Улучшенный интерфейс для приложения Lampa'
    };

    // Экспортируем объект плагина для внешнего доступа
    window.season_info = InterFaceMod;
})(); 