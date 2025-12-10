(function () {
    Lampa.Listener.wait('app', () => {
        Lampa.App.activity({
            url: 'https://www.example.com',
            component: 'full',
            title: 'Redirect'
        });
    });
})();
