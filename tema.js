(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.1',
        debug: false,
        settings: {
            enabled: true,
            theme: 'default',
            customColors: {
                background: '#3b2a35',
                text: '#ffd9ec',
                accent: '#ff69b4',
                accentLight: '#ffb6c1',
                card: '#503043'
            }
        }
    };

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
                /* ... (остальные стили bywolf_mod из вашего исходного кода) ... */
            `,
            custom: generateCustomTheme()
        };

        style.html(themes[theme] || '');
        $('head').append(style);
    }

    function generateCustomTheme() {
        const c = InterFaceMod.settings.customColors;
        return `
            body {
                background-color: ${c.background};
                color: ${c.text};
            }

            body.black--style {
                background: ${darkenColor(c.background, 20)};
            }

            .menu__item.focus,
            .menu__item.traverse,
            .menu__item.hover,
            .settings-folder.focus,
            .settings-param.focus,
            .selectbox-item.focus,
            .selectbox-item.hover,
            .full-person.focus,
            .full-start__button.focus,
            .full-descr__tag.focus,
            .simple-button.focus,
            .iptv-list__item.focus,
            .iptv-menu__list-item.focus,
            .head__action.focus,
            .head__action.hover,
            .player-panel .button.focus,
            .search-source.active {
                background: linear-gradient(to right, ${c.accentLight} 1%, ${c.accent} 100%);
                color: ${darkenColor(c.background, 20)};
            }

            /* ... (добавьте остальные стили, заменяя цвета на переменные) ... */
        `;
    }

    function darkenColor(color, percent) {
        // Функция для затемнения цвета
        // Реализацию можно добавить позже
        return color;
    }

    function showColorPicker() {
        // Создаем модальное окно для выбора цветов
        const modal = Lampa.Template.get('modal_default', {
            title: 'Персональные цвета',
            html: `
                <div class="modal--settings">
                    <div class="settings-param">
                        <div class="settings-param__name">Фон</div>
                        <div class="settings-param__value">
                            <input type="color" value="${InterFaceMod.settings.customColors.background}" data-color="background">
                        </div>
                    </div>
                    <div class="settings-param">
                        <div class="settings-param__name">Текст</div>
                        <div class="settings-param__value">
                            <input type="color" value="${InterFaceMod.settings.customColors.text}" data-color="text">
                        </div>
                    </div>
                    <div class="settings-param">
                        <div class="settings-param__name">Акцент</div>
                        <div class="settings-param__value">
                            <input type="color" value="${InterFaceMod.settings.customColors.accent}" data-color="accent">
                        </div>
                    </div>
                    <div class="settings-param">
                        <div class="settings-param__name">Карточки</div>
                        <div class="settings-param__value">
                            <input type="color" value="${InterFaceMod.settings.customColors.card}" data-color="card">
                        </div>
                    </div>
                </div>
            `,
            width: 700,
            onBack: ()=>{
                modal.destroy();
            },
            buttons: [{
                title: 'Сохранить',
                action: ()=>{
                    saveCustomColors();
                    modal.destroy();
                }
            }]
        });

        modal.show();
    }

    function saveCustomColors() {
        $('input[type="color"]').each(function(){
            const type = $(this).data('color');
            InterFaceMod.settings.customColors[type] = $(this).val();
        });

        Lampa.Storage.set('custom_colors', InterFaceMod.settings.customColors);
        if(InterFaceMod.settings.theme === 'custom') applyTheme('custom');
    }

    function startPlugin() {
        // Загружаем сохраненные цвета
        const savedColors = Lampa.Storage.get('custom_colors');
        if(savedColors) InterFaceMod.settings.customColors = savedColors;

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
                    'default': 'Обычная',
                    'bywolf_mod': 'Космическая',
                    'custom': 'Персональная'
                },
                default: 'default'
            },
            field: {
                name: 'Выбор темы',
                description: 'Выберите тему оформления интерфейса'
            },
            onChange: function (value) {
                if(value === 'custom') {
                    showColorPicker();
                }
                else {
                    InterFaceMod.settings.theme = value;
                    Lampa.Storage.set('theme_select', value);
                    applyTheme(value);
                }
            }
        });
    }

    // Остальной код остается без изменений
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
        description: 'Тема оформления для Lampa'
    };

    window.lampa_theme = InterFaceMod;
})();
