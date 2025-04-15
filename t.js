(function() {
    'use strict';

    var themes = {
        default: '.activity__loader{position:absolute;top:0;left:0;width:100%;height:100%;display:none;background:url("data:image/svg+xml,${svgCode}") no-repeat 50% 50%}',
        violet_stroke: ':root{--main-color:#8B29B9;--background-color:#1d1f20;--text-color:#fff}.activity__loader{position:absolute;top:0;left:0;width:100%;height:100%;display:none;background:url("data:image/svg+xml,${svgCode}") no-repeat 50% 50%}',
        neon_mod: ':root{--main-color:#e13fe4;--secondary-color:#9d61d3;--background-color:#0d0221;--text-color:#fff}.activity__loader{position:absolute;top:0;left:0;width:100%;height:100%;display:none;background:url("data:image/svg+xml,${svgCode}") no-repeat 50% 50%}',
        emerald: ':root{--main-color:#43cea2;--secondary-color:#185a9d;--background-color:#1a2a3a;--text-color:#fff}.activity__loader{position:absolute;top:0;left:0;width:100%;height:100%;display:none;background:url("data:image/svg+xml,${svgCode}") no-repeat 50% 50%}'
    };

    var loaderColors = {
        default: '#fff',
        violet_stroke: '#8B29B9',
        neon_mod: '#e13fe4',
        emerald: '#43cea2'
    };

    function applyTheme(theme) {
        var oldStyle = document.querySelector('#interface_theme_mod_style');
        if (oldStyle) {
            oldStyle.parentNode.removeChild(oldStyle);
        }

        var style = document.createElement('style');
        style.id = 'interface_theme_mod_style';
        var color = loaderColors[theme] || loaderColors.default;
        
        var svgCode = encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
                <!-- Кинолента -->
                <circle cx="75" cy="75" r="70" fill="none" stroke="${color}" stroke-width="5"/>
                <circle cx="75" cy="75" r="55" fill="none" stroke="${color}" stroke-width="5"/>
                
                <!-- Кадры на киноленте -->
                <g id="film">
                    <rect x="70" y="10" width="10" height="30" fill="${color}" />
                    <rect x="70" y="40" width="10" height="30" fill="${color}" />
                    <rect x="70" y="70" width="10" height="30" fill="${color}" />
                    <rect x="70" y="100" width="10" height="30" fill="${color}" />
                    <rect x="70" y="130" width="10" height="30" fill="${color}" />
                </g>

                <!-- Вращение киноленты -->
                <animateTransform attributeName="transform" type="rotate" from="0 75 75" to="360 75 75" dur="5s" repeatCount="indefinite" />

                <!-- Появление кадров -->
                <animate xlink:href="#film rect" attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.5s" repeatCount="indefinite" />
            </svg>
        `);

        style.textContent = themes[theme].replace('${svgCode}', svgCode);
        document.head.appendChild(style);

        console.log('Тема применена:', theme, 'Цвет loader\'а:', color);
    }

    function initPlugin() {
        var defaultTheme = 'default';
        var savedTheme = Lampa.Storage.get('interface_theme', defaultTheme);

        if (!themes[savedTheme]) {
            savedTheme = defaultTheme;
            Lampa.Storage.set('interface_theme', defaultTheme);
        }

        applyTheme(savedTheme);

        Lampa.SettingsApi.addParam({
            component: 'interface',
            param: {
                name: 'interface_theme',
                type: 'select',
                values: {
                    default: 'Стандартная',
                    violet_stroke: 'Фиолетовая',
                    neon_mod: 'Neon Mod',
                    emerald: 'Изумрудная'
                },
                default: defaultTheme
            },
            field: {
                name: 'Тема интерфейса',
                description: 'Измените внешний вид интерфейса'
            },
            onChange: function(value) {
                Lampa.Storage.set('interface_theme', value);
                Lampa.Settings.update();
                applyTheme(value);
            },
            onRender: function(item) {
                setTimeout(function() {
                    $('div[data-name="interface_theme"]').insertBefore('div[data-name="interface_size"]');
                }, 0);
            }
        });
    }

    if (window.appready) {
        initPlugin();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type === 'ready') {
                initPlugin();
            }
        });
    }
})();
