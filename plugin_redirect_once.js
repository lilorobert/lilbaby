(function(){
    window.plugin_redirect = function(){
        return {
            component: 'main',
            name: 'Auto Redirect',
            version: '1.0.0',
            author: 'Ты',
            description: 'Автоматический переход на кастомный URL',

            onCreate: function(){
                // Принудительно открываем новый адрес
                window.location.replace("http://89.22.225.226:9118");
            },

            onStart: function(){},
            onStop: function(){}
        }
    }

    Lampa.Plugin.register('plugin_redirect', window.plugin_redirect());
})();
