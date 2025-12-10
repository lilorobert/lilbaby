(function() {
    const OLD_HOST = 'https://lampa.mx';
    const NEW_HOST = 'http://194.87.29.170:12354'; // <-- Введи свой сервер здесь

    // Перехватываем fetch
    const originalFetch = window.fetch;
    window.fetch = function(input, init){
        if (typeof input === 'string' && input.includes(OLD_HOST)) {
            input = input.replace(OLD_HOST, NEW_HOST);
        }
        return originalFetch(input, init);
    };

    // Перехватываем XMLHttpRequest
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        if (url.includes(OLD_HOST)) {
            url = url.replace(OLD_HOST, NEW_HOST);
        }
        return open.apply(this, [method, url]);
    };

    console.log("🔥 Подмена сервера Lampa.mx → " + NEW_HOST + " активирована");
})();
