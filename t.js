(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '1.1.1',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default'
        }
    };

    function applyTheme(theme) {
        $('#interface_mod_theme').remove();
        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            neon_night: `
                body { background-color: #0f0f1b; color: #e0ff70; }
                body.black--style { background: #181827; }
                .card__focus, .card:hover {
                    box-shadow: 0 0 0 2px #c471f5, 0 0 15px rgba(196, 113, 245, 0.5) !important;
                    background: transparent !important;
                }
                .focus, .hover {
                    background: linear-gradient(to right, #c471f5, #fa71cd) !important;
                    color: #0f0f1b !important;
                }
            `,
            forest_dream: `
                body { background-color: #1e2d24; color: #d3f2c2; }
                body.black--style { background: #162019; }
                .card__focus, .card:hover {
                    box-shadow: 0 0 0 2px #3f8a54, 0 0 15px rgba(63, 138, 84, 0.5) !important;
                    background: transparent !important;
                }
                .focus, .hover {
                    background: linear-gradient(to right, #3f8a54, #a0c49d) !important;
                    color: #0e1b12 !important;
                }
            `,
            cyber_wave: `
                body { background-color: #081b29; color: #a8f0ff; }
                body.black--style { background: #04121d; }
                .card__focus, .card:hover {
                    box-shadow: 0 0 0 2px #00ffe7, 0 0 15px rgba(0, 255, 231, 0.5) !important;
                    background: transparent !important;
                }
                .focus, .hover {
                    background: linear-gradient(to right, #00ffe7, #0073ff) !important;
                    color: #081b29 !important;
                }
            `,
            sunset_glow: `
                body { background-color: #2e1a24; color: #ffdbb5; }
                body.black--style { background: #1e1017; }
                .card__focus, .card:hover {
                    box-shadow: 0 0 0 2px #ff6e7f, 0 0 15px rgba(255, 110, 127, 0.5) !important;
                    background: transparent !important;
                }
                .focus, .hover {
                    background: linear-gradient(to right, #ff6e7f, #bfe9ff) !important;
                    color: #2e1a24 !important;
                }
            `,
            peach_milk: `
                body { background-color: #fff0e6; color: #5c3a21; }
                body.black--style { background: #f5d3c8; }
                .card__focus, .card:hover {
                    box-shadow: 0 0 0 2px #ffd1dc, 0 0 15px rgba(255, 209, 220, 0.5) !important;
                    background: transparent !important;
                }
                .focus, .hover {
                    background: linear-gradient(to right, #ffd1dc, #ffe0b2) !important;
                    color: #5c3a21 !important;
                }
            `,
            terminal_dark: `
                body { background-color: #000000; color: #00ff00; font-family: monospace; }
                .card__focus, .card:hover {
                    box-shadow: 0 0 0 2px #00ff00, 0 0 15px rgba(0, 255, 0, 0.5) !important;
                    background: transparent !important;
                }
                .focus, .hover {
                    background-color: #003300 !important;
                    color: #00ff00 !important;
                }
            `,
            arctic_light: `
                body { background-color: #e0f7fa; color: #004d40; }
                body.black--style { background: #cceef0; }
                .card__focus, .card:hover {
                    box-shadow: 0 0 0 2px #b2ebf2, 0 0 15px rgba(178, 235, 242, 0.5) !important;
                    background: transparent !important;
                }
                .focus, .hover {
                    background: linear-gradient(to right, #b2ebf2, #80deea) !important;
                    color: #004d40 !important;
                }
            `,
            solar_flare: `
                body { background-color: #2a1100; color: #ffe082; }
                body.black--style { background: #1d0b00; }
                .card__focus, .card:hover {
                    box-shadow: 0 0 0 2px #ff9800, 0 0 15px rgba(255, 152, 0, 0.5) !important;
                    background: transparent !important;
                }
                .focus, .hover {
                    background: linear-gradient(to right, #ff9800, #ff5722) !important;
                    color: #2a1100 !important;
                }
            `,
            lavender_dream: `
                body { background-color: #f3e5f5; color: #4a148c; }
                body.black--style { background: #e1bee7; }
                .card__focus, .card:hover {
                    box-shadow: 0 0 0 2px #ba68c8, 0 0 15px rgba(186, 104, 200, 0.5) !important;
                    background: transparent !important;
                }
                .focus, .hover {
                    background: linear-gradient(to right, #ba68c8, #ce93d8) !important;
                    color: #4a148c !important;
                }
            `,
            matrix_rain: `
                body { background-color: #000000; color: #00ff00; font-family: 'Courier New', monospace; }
                .card__focus, .card:hover {
                    box-shadow: 0 0 0 2px #00ff00, 0 0 15px rgba(0, 255, 0, 0.5) !important;
                    background: transparent !important;
                }
                .focus, .hover {
                    background-color: #003300 !important;
                    color: #00ff00 !important;
                }
            `,
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        applyTheme(InterFaceMod.settings.theme);

        Lampa.SettingsApi.addComponent({
            component: 'theme_mod',
            name: 'LampaColor Theme',
            icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>'
        });

        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'theme_select',
                type: 'select',
                values: {
                    default: 'Обычная',
                    neon_night: 'Неоновая ночь',
                    forest_dream: 'Лесной сон',
                    cyber_wave: 'Киберволна',
                    sunset_glow: 'Закат',
                    peach_milk: 'Персиковый милк',
                    terminal_dark: 'Терминал',
                    arctic_light: 'Арктический свет',
                    solar_flare: 'Солнечный взрыв',
                    lavender_dream: 'Лавандовый сон',
                    matrix_rain: 'Матрица'
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
        version: '1.1.1',
        description: 'Тема оформления для Lampa с 10 стилями и аккуратными рамками'
    };

    window.lampa_theme = InterFaceMod;
})();
