(function () {
    'use strict';

    var InterFaceMod = {
        name: 'LampaColor',
        version: '0.0.2',
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

                body.black--style {
                    background: #2a1d27;
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
                    background: linear-gradient(to right, #ffb6c1 1%, #ff69b4 100%);
                    color: #2a1d27;
                }

                .settings-folder.focus .settings-folder__icon {
                    filter: invert(1);
                }

                .settings-param-title > span {
                    color: #fff;
                }

                .settings__content,
                .settings-input__content,
                .selectbox__content,
                .modal__content {
                    background: linear-gradient(135deg, #4a2f3a 1%, #1c1016 100%);
                }

                .settings-input__links {
                    background-color: rgba(255, 182, 193, 0.2);
                }

                .card.focus .card__view::after,
                .card.hover .card__view::after,
                .extensions__item.focus:after,
                .torrent-item.focus::after,
                .extensions__block-add.focus:after {
                    border-color: #ffc0cb;
                }

                .online-prestige.focus::after,
                .iptv-channel.focus::before,
                .iptv-channel.last--focus::before {
                    border-color: #ffc0cb !important;
                }

                .time-line > div,
                .player-panel__position,
                .player-panel__position > div:after {
                    background-color: #ffc0cb;
                }

                .extensions {
                    background: #2a1d27;
                }

                .extensions__item,
                .extensions__block-add {
                    background-color: #503043;
                }

                .torrent-item__size,
                .torrent-item__exe,
                .torrent-item__viewed,
                .torrent-serial__size {
                    background-color: #ffd9ec;
                    color: #2a1d27;
                }

                .torrent-serial {
                    background-color: rgba(255, 192, 203, 0.08);
                }

                .torrent-file.focus,
                .torrent-serial.focus {
                    background-color: rgba(255, 192, 203, 0.28);
                }

                .iptv-channel {
                    background-color: #6a3c58 !important;
                }
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

            .settings-folder.focus .settings-folder__icon {
                filter: invert(1);
            }

            .settings-param-title > span {
                color: ${c.text};
            }

            .settings__content,
            .settings-input__content,
            .selectbox__content,
            .modal__content {
                background: ${c.background};
            }

            .settings-input__links {
                background-color: ${lightenColor(c.accent, 80)};
            }

            .card.focus .card__view::after,
            .card.hover .card__view::after,
            .extensions__item.focus:after,
            .torrent-item.focus::after,
            .extensions__block-add.focus:after {
                border-color: ${c.accentLight};
            }

            .online-prestige.focus::after,
            .iptv-channel.focus::before,
            .iptv-channel.last--focus::before {
                border-color: ${c.accentLight} !important;
            }

            .time-line > div,
            .player-panel__position,
            .player-panel__position > div:after {
                background-color: ${c.accent};
            }

            .extensions {
                background: ${darkenColor(c.background, 10)};
            }

            .extensions__item,
            .extensions__block-add {
                background-color: ${c.card};
            }

            .torrent-item__size,
            .torrent-item__exe,
            .torrent-item__viewed,
            .torrent-serial__size {
                background-color: ${c.text};
                color: ${c.background};
            }

            .torrent-serial {
                background-color: ${lightenColor(c.accent, 90)};
            }

            .torrent-file.focus,
            .torrent-serial.focus {
                background-color: ${lightenColor(c.accent, 70)};
            }

            .iptv-channel {
                background-color: ${darkenColor(c.accent, 20)} !important;
            }
        `;
    }

    function darkenColor(color, percent) {
        // Упрощенная функция затемнения цвета
        return color; // В реальной реализации нужно добавить логику затемнения
    }

    function lightenColor(color, percent) {
        // Упрощенная функция осветления цвета
        return color; // В реальной реализации нужно добавить логику осветления
    }

    function showColorPicker() {
        const colors = InterFaceMod.settings.customColors;
        
        const html = `
            <div class="settings-param">
                <div class="settings-param__name">Фон</div>
                <div class="settings-param__value">
                    <input type="color" value="${colors.background}" data-color="background">
                    <input type="text" class="settings-input" value="${colors.background}" 
                           data-color-text="background" maxlength="7">
                </div>
            </div>
            <div class="settings-param">
                <div class="settings-param__name">Текст</div>
                <div class="settings-param__value">
                    <input type="color" value="${colors.text}" data-color="text">
                    <input type="text" class="settings-input" value="${colors.text}" 
                           data-color-text="text" maxlength="7">
                </div>
            </div>
            <div class="settings-param">
                <div class="settings-param__name">Акцент</div>
                <div class="settings-param__value">
                    <input type="color" value="${colors.accent}" data-color="accent">
                    <input type="text" class="settings-input" value="${colors.accent}" 
                           data-color-text="accent" maxlength="7">
                </div>
            </div>
            <div class="settings-param">
                <div class="settings-param__name">Светлый акцент</div>
                <div class="settings-param__value">
                    <input type="color" value="${colors.accentLight}" data-color="accentLight">
                    <input type="text" class="settings-input" value="${colors.accentLight}" 
                           data-color-text="accentLight" maxlength="7">
                </div>
            </div>
            <div class="settings-param">
                <div class="settings-param__name">Карточки</div>
                <div class="settings-param__value">
                    <input type="color" value="${colors.card}" data-color="card">
                    <input type="text" class="settings-input" value="${colors.card}" 
                           data-color-text="card" maxlength="7">
                </div>
            </div>
        `;

        const modal = Lampa.Modal.create({
            title: 'Персональные цвета',
            html: html,
            width: 800,
            buttons: [{
                title: 'Сохранить',
                action: function(){
                    saveCustomColors();
                    Lampa.Modal.destroy();
                }
            }]
        });

        // Связываем color picker и текстовые поля
        modal.find('input[type="color"]').on('change', function(){
            const textField = modal.find(`[data-color-text="${$(this).data('color')}"]`);
            textField.val($(this).val());
        });

        modal.find('.settings-input').on('input', function(){
            const color = $(this).val();
            if(/^#[0-9A-F]{6}$/i.test(color)){
                const colorField = modal.find(`[data-color="${$(this).data('color-text')}"]`);
                colorField.val(color);
            }
        });

        Lampa.Modal.show(modal);
    }

    function saveCustomColors() {
        const modal = Lampa.Modal.active();
        
        if(modal){
            modal.find('input[type="color"]').each(function(){
                const type = $(this).data('color');
                InterFaceMod.settings.customColors[type] = $(this).val();
            });

            Lampa.Storage.set('custom_colors', InterFaceMod.settings.customColors);
            Lampa.Storage.set('theme_select', 'custom');
            InterFaceMod.settings.theme = 'custom';
            
            applyTheme('custom');
        }
    }

    function startPlugin() {
        // Загружаем сохраненные настройки
        const savedColors = Lampa.Storage.get('custom_colors', InterFaceMod.settings.customColors);
        if(savedColors) InterFaceMod.settings.customColors = savedColors;

        InterFaceMod.settings.theme = Lampa.Storage.get('theme_select', 'default');
        applyTheme(InterFaceMod.settings.theme);

        // Добавляем компонент в настройки
        Lampa.SettingsApi.addComponent({
            component: 'theme_mod',
            name: 'LampaColor Theme',
            icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>'
        });

        // Добавляем параметр выбора темы
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

    // Инициализация плагина
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') {
                startPlugin();
            }
        });
    }

    // Регистрация плагина
    Lampa.Manifest.plugins = {
        name: 'LampaColor',
        version: '1.0.0',
        description: 'Тема оформления для Lampa с персонализацией цветов'
    };

    window.lampa_theme = InterFaceMod;
})();
