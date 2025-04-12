(function () {
    'use strict';
    
    var timer = setInterval(function () {
        if (typeof Lampa !== 'undefined') {
            clearInterval(timer);
            
            var unic_id = Lampa.Storage.get('lampac_unic_id', '');
            if (!unic_id) {
                unic_id = Lampa.Utils.uid(8).toLowerCase();
                Lampa.Storage.set('lampac_unic_id', unic_id);
            }

            Lampa.Utils.putScriptAsync(["http://94.156.114.7:11411/startpage.js"], function () {});
            Lampa.Utils.putScriptAsync(["http://94.156.114.7:11411/online.js"], function () {});
            Lampa.Utils.putScriptAsync(["http://94.156.114.7:11411/tracks.js"], function () {});
            Lampa.Utils.putScriptAsync(["https://lilorobert.github.io/lilbaby/no.js"], function () {});
        }
    }, 200);
})();
