(function () {
    const wait = setInterval(() => {
        if (window.Lampa && Lampa.App && Lampa.Api) {
            clearInterval(wait);

            // тут твой код
            console.log('Lampa loaded');

        }
    }, 50);
})();
