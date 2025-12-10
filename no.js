(function() {
    'use strict';

    Lampa.Platform.tv();
    
    // НАСТРОЙКА: укажи здесь нужный сервер
    const TARGET_SERVER = "194.87.29.170:12354/"; // ← измени на свой сервер
    
    // ИЛИ выбери один из серверов ниже (раскомментируй нужную строку):
    // const TARGET_SERVER = "kinobase.org:8080";
    // const TARGET_SERVER = "filmix.ac:80";
    // const TARGET_SERVER = "hd.kinopoisk.ru";
    
    var server_protocol = location.protocol === "https:" ? 'https://' : 'http://';
    
    // Функция редиректа
    function redirectToServer() {
        var redirectUrl = server_protocol + TARGET_SERVER;
        console.log('Перенаправление на:', redirectUrl);
        window.location.href = redirectUrl;
    }

    function startMe() {
        // Автоматический редирект при загрузке (с небольшой задержкой)
        setTimeout(function() {
            redirectToServer();
        }, 1000); // 1 секунда задержки
        
        // Добавляем кнопку в интерфейс на случай, если редирект не сработал
        var iconSVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';
        var buttonHTML = '<div id="AUTO_REDIRECT" class="head__action selector" style="color: #ffcc00;">' + iconSVG + '</div>';
        
        $('#app > div.head > div > div.head__actions').append(buttonHTML);
        $('#AUTO_REDIRECT').on('hover:enter hover:click hover:touch', redirectToServer);
    }
    
    // Добавляем настройку в меню (опционально)
    Lampa.SettingsApi.addComponent({
        component: 'auto_redirect',
        name: 'Авто-редирект',
        icon: '<svg width="24" height="24" fill="currentColor"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/></svg>'
    });
    
    Lampa.SettingsApi.addParam({
        component: 'auto_redirect',
        param: {
            name: 'auto_redirect_info',
            type: 'info',
            default: false
        },
        field: {
            name: 'Текущий сервер: ' + TARGET_SERVER,
            description: 'Приложение будет автоматически перенаправлено на этот сервер'
        }
    });

    // Запуск
    if(window.appready) startMe();
    else {
        Lampa.Listener.follow('app', function(e) {
            if(e.type == 'ready') startMe();
        });
    }
})();

