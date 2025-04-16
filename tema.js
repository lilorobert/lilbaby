(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.3',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            customColor: '' // Пустое значение по умолчанию
        }
    };

    function applyTheme(theme, customColor) {
        $('#interface_mod_theme').remove();
        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            bywolf_mod: `...`, // Твой старый CSS для bywolf_mod
            custom: customColor ? `
                .menu__item.focus,
                .menu__item.hover,
                .settings-folder.focus,
                .card.focus .card__view::after,
                .player-panel .button.focus {
                    background: ${customColor} !important;
                    color: #000 !important;
                }
                .time-line > div {
                    background: ${customColor} !important;
                }
            ` : ''
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function startPlugin() {
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.customColor = Lampa.Storage.get('custom_color', '');
        applyTheme(InterFaceMod.settings.theme, InterFaceMod.settings.customColor);

        Lampa.SettingsApi.addComponent({
            component: 'theme_mod',
            name: 'LampaColor Theme',
            icon: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/></svg>'
        });

        // Выбор темы
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'theme_select',
                type: 'select',
                values: {
                    'default': 'Обычная',
                    'bywolf_mod': 'Космическая',
                    'custom': '🎨 Персональная'
                },
                default: 'default'
            },
            field: {
                name: 'Выбор темы',
                description: 'Выберите стиль оформления'
            },
            onChange: function (value) {
                InterFaceMod.settings.theme = value;
                Lampa.Storage.set('theme_select', value);
                applyTheme(value, InterFaceMod.settings.customColor);
                Lampa.SettingsApi.update(); // Обновляем настройки, чтобы показать/скрыть поле цвета
            }
        });

        // Поле для цвета (появляется только при выборе "Персональная")
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'custom_color',
                type: 'text',
                default: ''
            },
            field: {
                name: 'HEX-код цвета',
                description: 'Например: #ff0000 (красный)',
                hidden: () => InterFaceMod.settings.theme !== 'custom',
                html: `
                    <div class="settings-param__value" style="gap: 10px; display: flex;">
                        <input type="text" placeholder="#000000" class="settings-input" data-color-input>
                        <button class="settings-button" data-color-example style="
                            background: #ff0000;
                            width: 30px;
                            height: 30px;
                            border-radius: 4px;
                        "></button>
                    </div>
                `,
                onRender: (field) => {
                    const input = field.querySelector('[data-color-input]');
                    const exampleBtn = field.querySelector('[data-color-example]');

                    input.value = InterFaceMod.settings.customColor;

                    // Примеры цветов
                    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
                    let colorIndex = 0;

                    exampleBtn.addEventListener('click', () => {
                        colorIndex = (colorIndex + 1) % colors.length;
                        input.value = colors[colorIndex];
                        updateColor(colors[colorIndex]);
                    });

                    input.addEventListener('input', (e) => {
                        updateColor(e.target.value);
                    });

                    function updateColor(color) {
                        if (/^#[0-9A-F]{6}$/i.test(color)) {
                            InterFaceMod.settings.customColor = color;
                            Lampa.Storage.set('custom_color', color);
                            applyTheme('custom', color);
                            exampleBtn.style.background = color;
                        }
                    }
                }
            }
        });
    }

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', (e) => e.type === 'ready' && startPlugin());

    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Кастомизация тем с персональными цветами'
    };
})();
