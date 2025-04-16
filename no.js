(function() {
    const plugin = {
        type: 'video',
        name: 'Lordfilm',
        version: '1.0',
        on: function(callback) {
            callback({
                component: 'search',
                name: 'Lordfilm',
                search: function(query, call) {
                    let url = `https://lordfilm.ng/index.php?do=search&subaction=search&story=${encodeURIComponent(query)}`;

                    fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`)
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            const items = [];

                            doc.querySelectorAll('.short .short-content').forEach(el => {
                                const title = el.querySelector('a.short-title')?.textContent?.trim();
                                const link = el.querySelector('a.short-title')?.href;
                                const img = el.querySelector('img')?.getAttribute('src');

                                if (title && link) {
                                    items.push({
                                        title: title,
                                        url: link,
                                        poster: img || '',
                                        quality: 'HD',
                                        year: '',
                                        description: '',
                                        subtitles: [],
                                        episodes: [],
                                        player: (callback) => {
                                            callback([{
                                                file: link,
                                                title: title
                                            }]);
                                        }
                                    });
                                }
                            });

                            call(items);
                        })
                        .catch(e => {
                            console.error('Lordfilm error:', e);
                            call([]);
                        });
                }
            });
        }
    };

    Lampa.Platform.addPlugin(plugin);
})();
