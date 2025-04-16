(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.3',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            customColor: '' // Изначально пусто
        }
    };

    function applyTheme(theme, customColor) {
        $('#interface_mod_theme').remove();
        if (theme === 'default') return;

        const style = $('<style id="interface_mod_theme"></style>');

        const themes = {
            bywolf_mod: `...`, // Твой CSS для космической темы
            custom: customColor ? `
                /* Динамические стили для выбранного цвета */
                .menu__item.focus, .card.focus .card__view::after {
                    background: ${customColor} !important;
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
        // Загружаем сохранённые настройки
        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        InterFaceMod.settings.customColor = Lampa.Storage.get('custom_color', '');
        applyTheme(InterFaceMod.settings.theme, InterFaceMod.settings.customColor);

        // Добавляем выбор темы
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
                description: 'Стиль интерфейса'
            },
            onChange: function (value) {
                InterFaceMod.settings.theme = value;
                Lampa.Storage.set('theme_select', value);
                applyTheme(value, InterFaceMod.settings.customColor);
                // НЕ нужно вызывать update() - Lampa обновит интерфейс сам!
            }
        });

        // Поле для цвета (появляется только для персональной темы)
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'custom_color',
                type: 'text',
                default: ''
            },
            field: {
                name: 'Цвет (HEX)',
                description: 'Например: #FF0000 (красный)',
                hidden: () => InterFaceMod.settings.theme !== 'custom', // Автоматически скрывается
                html: `
                    <div style="display: flex; gap: 10px;">
                        <input type="text" 
                               placeholder="#FFFFFF" 
                               class="settings-input" 
                               value="${InterFaceMod.settings.customColor || ''}">
                        <div class="settings-button" 
                             style="width: 30px; height: 30px; 
                                    background: ${InterFaceMod.settings.customColor || '#FF0000'};
                                    border-radius: 4px;"></div>
                    </div>
                `,
                onRender: (field) => {
                    const input = field.querySelector('input');
                    const colorPreview = field.querySelector('.settings-button');

                    input.addEventListener('input', (e) => {
                        const color = e.target.value;
                        if (/^#[0-9A-F]{6}$/i.test(color)) {
                            InterFaceMod.settings.customColor = color;
                            Lampa.Storage.set('custom_color', color);
                            colorPreview.style.background = color;
                            if (InterFaceMod.settings.theme === 'custom') {
                                applyTheme('custom', color);
                            }
                        }
                    });
                }
            }
        });
    }

    // Запуск плагина
    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', (e) => e.type === 'ready' && startPlugin());

    // Информация о плагине
    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Кастомные темы с выбором цвета'
    };
})();
