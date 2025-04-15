(function() {
    'use strict';

    // Темы
    var themes = {
        default: '.activity__loader{position:absolute;top:0;left:0;width:100%;height:100%;display:none;display:flex;align-items:center;justify-content:center;} .loader-circle{width:60px;height:60px;border-radius:50%;position:relative;display:flex;align-items:center;justify-content:center;} .loader-circle div{position:absolute;width:100%;height:100%;border-radius:50%;background-color:#fff;opacity:0;animation:pulse 1.5s infinite;} .loader-circle div:nth-child(1){animation-delay:0s;} .loader-circle div:nth-child(2){animation-delay:0.3s;} .loader-circle div:nth-child(3){animation-delay:0.6s;} .loader-circle div:nth-child(4){animation-delay:0.9s;} @keyframes pulse{0%{opacity:0;transform:scale(0.5);}50%{opacity:1;transform:scale(1);}100%{opacity:0;transform:scale(0.5);}}',
        violet_stroke: '.activity__loader{position:absolute;top:0;left:0;width:100%;height:100%;display:none;display:flex;align-items:center;justify-content:center;} .loader-circle{width:60px;height:60px;border-radius:50%;position:relative;display:flex;align-items:center;justify-content:center;} .loader-circle div{position:absolute;width:100%;height:100%;border-radius:50%;background-color:#8B29B9;opacity:0;animation:pulse 1.5s infinite;} .loader-circle div:nth-child(1){animation-delay:0s;} .loader-circle div:nth-child(2){animation-delay:0.3s;} .loader-circle div:nth-child(3){animation-delay:0.6s;} .loader-circle div:nth-child(4){animation-delay:0.9s;} @keyframes pulse{0%{opacity:0;transform:scale(0.5);}50%{opacity:1;transform:scale(1);}100%{opacity:0;transform:scale(0.5);}}',
        neon_mod: '.activity__loader{position:absolute;top:0;left:0;width:100%;height:100%;display:none;display:flex;align-items:center;justify-content:center;} .loader-circle{width:60px;height:60px;border-radius:50%;position:relative;display:flex;align-items:center;justify-content:center;} .loader-circle div{position:absolute;width:100%;height:100%;border-radius:50%;background-color:#e13fe4;opacity:0;animation:pulse 1.5s infinite;} .loader-circle div:nth-child(1){animation-delay:0s;} .loader-circle div:nth-child(2){animation-delay:0.3s;} .loader-circle div:nth-child(3){animation-delay:0.6s;} .loader-circle div:nth-child(4){animation-delay:0.9s;} @keyframes pulse{0%{opacity:0;transform:scale(0.5);}50%{opacity:1;transform:scale(1);}100%{opacity:0;transform:scale(0.5);}}',
        emerald: '.activity__loader{position:absolute;top:0;left:0;width:100%;height:100%;display:none;display:flex;align-items:center;justify-content:center;} .loader-circle{width:60px;height:60px;border-radius:50%;position:relative;display:flex;align-items:center;justify-content:center;} .loader-circle div{position:absolute;width:100%;height:100%;border-radius:50%;background-color:#43cea2;opacity:0;animation:pulse 1.5s infinite;} .loader-circle div:nth-child(1){animation-delay:0s;} .loader-circle div:nth-child(2){animation-delay:0.3s;} .loader-circle div:nth-child(3){animation-delay:0.6s;} .loader-circle div:nth-child(4){animation-delay:0.9s;} @keyframes pulse{0%{opacity:0;transform:scale(0.5);}50%{opacity:1;transform:scale(1);}100%{opacity:0;transform:scale(0.5);}}'
    };

    function applyTheme(theme) {
        var oldStyle = document.querySelector('#interface_theme_mod_style');
        if (oldStyle) {
            oldStyle.parentNode.removeChild(oldStyle);
        }

        var style = document.createElement('style');
        style.id = 'interface_theme_mod_style';
        style.textContent = themes[theme];
        document.head.appendChild(style);

        console.log('Тема применена:', theme);
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
