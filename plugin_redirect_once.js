(function(){
    window.plugin_redirect_once = function(){
        return {
            component: 'main',
            name: 'Auto Redirect Once',
            version: '1.0.1',
            author: 'Ты',
            description: 'Редирект только при первом запуске',

            onCreate: function(){
                // Проверяем, был ли редирект уже выполнен
                if (!localStorage.getItem("plugin_redirect_done")) {
                    localStorage.setItem("plugin_redirect_done", "true");
                    location.href = "http://89.22.225.226:9118";  // используем location.href
                }
            },

            onStart: function(){},
            onStop: function(){}
        }
    }

    Lampa.Plugin.register('plugin_redirect_once', window.plugin_redirect_once());
})();
