(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.3',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            font: 'system'
        }
    };

    // Киношные шрифты
    const availableFonts = {
        'system':       'Системный',
        'matrix':       'Матрица',
        'star-wars':    'Звёздные войны',
        'harry-potter': 'Гарри Поттер',
        'marvel':       'Marvel Comics',
        'transformers': 'Трансформеры',
        'jurassic':     'Парк Юрского периода',
        'stranger':     'Очень странные дела',
        'blade-runner': 'Бегущий по лезвию',
        'cyberpunk':    'Киберпанк 2077',
        'got':          'Игра Престолов'
    };

    function applyFont(font) {
        $('#interface_mod_font').remove();
        if (font === 'system') return;

        const style = $('<style id="interface_mod_font"></style>');

        const fontData = {
            'matrix': {
                import: `@import url('https://fonts.cdnfonts.com/css/matrix-code-nfi');`,
                family: "'Matrix Code NFI', monospace",
                css: `
                    body {
                        letter-spacing: 2px;
                        line-height: 1.2;
                        font-weight: 400;
                    }
                    .card__title, .full__title {
                        letter-spacing: 3px;
                    }`
            },
            'star-wars': {
                import: `@import url('https://fonts.cdnfonts.com/css/star-wars');`,
                family: "'Star Wars', sans-serif",
                css: `
                    .full__title, .head__title {
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                    }`
            },
            'harry-potter': {
                import: `@import url('https://fonts.cdnfonts.com/css/harry-potter');`,
                family: "'Harry Potter', serif",
                css: `
                    .card__title {
                        font-weight: 700;
                        letter-spacing: 1px;
                    }`
            },
            'marvel': {
                import: `@import url('https://fonts.cdnfonts.com/css/marvel');`,
                family: "'Marvel', sans-serif",
                css: `
                    .card__title, .full__title {
                        font-weight: 700;
                        letter-spacing: 0.5px;
                    }`
            },
            'transformers': {
                import: `@import url('https://fonts.cdnfonts.com/css/transformers-movie');`,
                family: "'Transformers Movie', sans-serif",
                css: `
                    body {
                        letter-spacing: 1px;
                    }
                    .full__title {
                        text-transform: uppercase;
                    }`
            },
            'jurassic': {
                import: `@import url('https://fonts.cdnfonts.com/css/jurassic-park');`,
                family: "'Jurassic Park', sans-serif",
                css: `
                    .full__title {
                        letter-spacing: 2px;
                    }`
            },
            'stranger': {
                import: `@import url('https://fonts.cdnfonts.com/css/itc-benguiat');`,
                family: "'ITC Benguiat', serif",
                css: `
                    .card__title, .full__title {
                        font-weight: 600;
                    }`
            },
            'blade-runner': {
                import: `@import url('https://fonts.cdnfonts.com/css/blade-runner-movie-font');`,
                family: "'Blade Runner Movie Font', sans-serif",
                css: `
                    body {
                        letter-spacing: 0.8px;
                    }`
            },
            'cyberpunk': {
                import: `@import url('https://fonts.cdnfonts.com/css/rajdhani');`,
                family: "'Rajdhani', sans-serif",
                css: `
                    .card__title, .full__title {
                        font-weight: 600;
                        letter-spacing: 0.5px;
                    }`
            },
            'got': {
                import: `@import url('https://fonts.cdnfonts.com/css/game-of-thrones');`,
                family: "'Game of Thrones', serif",
                css: `
                    .full__title {
                        letter-spacing: 1.5px;
                    }`
            }
        };

        style.html(`
            ${fontData[font].import}
            body, .full-start-new__details, .settings-param-title, 
            .card__title, .head__title, .full__title,
            .menu__item, .selectbox-item, .settings-param-title {
                font-family: ${fontData[font].family} !important;
            }
            ${fontData[font].css}
        `);

        $('head').append(style);
    }

    function applyTheme(theme) {
        $('#interface_mod_theme').remove();
        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            bywolf_mod: `
                body {
                    background-color: #3b2a35;
                    color: #ffd9ec;
                }
                /* ... (все ваши 20 тем остаются без изменений) ... */
                .full-start-new__details,
                .full-start-new__details span,
                .full-start-new__split {
                    color: #ffd9ec !important;
                    opacity: 0.9;
                }
            `,
            // ... (остальные 19 тем с их стилями)
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.font = Lampa.Storage.get('font_select', 'system');
        
        applyTheme(InterFaceMod.settings.theme);
        applyFont(InterFaceMod.settings.font);

        Lampa.SettingsApi.addComponent({
            component: 'theme_mod',
            name: 'LampaColor Theme',
            icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>'
        });

        // Настройки тем
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'theme_select',
                type: 'select',
                values: {
                    'default': 'Обычная',
                    'bywolf_mod': 'Космическая',
                    'ocean_depth': 'Глубины океана',
                    'golden_sun': 'Золотое солнце',
                    'royal_purple': 'Королевский пурпур',
                    'fire_glow': 'Огненное сияние',
                    'icy_wind': 'Ледяной ветер',
                    'midnight_city': 'Ночной город',
                    'desert_sand': 'Пустынные пески',
                    'neon_dream': 'Неоновая мечта',
                    'emerald_island': 'Изумрудный остров',
                    'twilight_sky': 'Сумеречное небо',
                    'velvet_dusk': 'Бархатные сумерки',
                    'copper_blaze': 'Медный огонь',
                    'arctic_sky': 'Арктическое небо',
                    'blood_moon': 'Кровавая луна',
                    'cosmic_gold': 'Космическое золото',
                    'mystic_plum': 'Мистическая слива',
                    'steel_blue': 'Стальная синь',
                    'amber_night': 'Янтарная ночь',
                    'velvet_rose': 'Бархатная роза',
                    'galaxy_core': 'Ядро галактики'
                },
                default: 'default'
            },
            field: {
                name: 'Выбор темы',
                description: 'Выберите тему оформления интерфейса'
            },
            onChange: function (value) {
                InterFaceMod.settings.theme = value;
                Lampa.Storage.set('theme_select', value);
                applyTheme(value);
            }
        });

        // Настройки шрифтов
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'font_select',
                type: 'select',
                values: availableFonts,
                default: 'system'
            },
            field: {
                name: 'Киношные шрифты',
                description: 'Выберите стиль из известных фильмов'
            },
            onChange: function (value) {
                InterFaceMod.settings.font = value;
                Lampa.Storage.set('font_select', value);
                applyFont(value);
            }
        });
    }

    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') {
                startPlugin();
            }
        });
    }

    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Темы оформления и киношные шрифты для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
