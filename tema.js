(function () {
    'use strict';

    const InterFaceMod = {
        name: 'LampaColor',
        version: '1.0.5',
        settings: {
            theme: Lampa.Storage.get('theme_select', 'default'),
            customColor: Lampa.Storage.get('custom_color', '#ff69b4') // Цвет по умолчанию
        }
    };

    // Функция применения темы
    function applyTheme() {
        $('#interface_mod_theme').remove(); // Удаляем старые стили

        const style = $('<style id="interface_mod_theme"></style>'); // Создаем новый элемент стилей

        // Применяем стили в зависимости от выбранной темы
        if (InterFaceMod.settings.theme === 'default') {
            $('head').append(style); // Обычная тема, без изменений
            return;
        }

        if (InterFaceMod.settings.theme === 'bywolf_mod') {
            style.html(`
                body {
                    background-color: #3b2a35;
                    color: #ffd9ec;
                }
                .menu__item.focus,
                .menu__item.hover {
                    background: linear-gradient(to right, #ffb6c1 1%, #ff69b4 100%);
                    color: #2a1d27;
                }
            `);
        }

        if (InterFaceMod.settings.theme === 'custom') {
            const color = InterFaceMod.settings.customColor; // Получаем выбранный цвет
            style.html(`
                body {
                    background-color: #2a1d27; /* Фон темный для персональной темы */
                    color: #fff;
                }
                .menu__item.focus,
                .menu__item.hover,
                .settings-param.focus,
                .selectbox-item.focus,
                .simple-button.focus,
                .full-start__button.focus,
                .head__action.focus {
                    background: ${color} !important; /* Цвет, выбранный пользователем */
                    color: #fff !important;
                }

                .card.focus .card__view::after {
                    border-color: ${color} !important;
                }
            `);
        }

        $('head').append(style); // Добавляем стили в head
    }

    // Функция для создания палитры цветов
    function createColorPalette() {
        const colors = ['#ff69b4', '#4caf50', '#2196f3', '#ff5722', '#9c27b0', '#03a9f4']; // Пример цветов
        let paletteHtml = '<div id="colorPalette" style="display: flex; gap: 10px; margin-top: 10px;">';

        colors.forEach(color => {
            paletteHtml += `<div class="colorSwatch" style="width: 30px; height: 30px; background-color: ${color}; cursor: pointer;" data-color="${color}"></div>`;
        });

        paletteHtml += '</div>';
        return paletteHtml;
    }

    // Функция для старта плагина
    function startPlugin() {
        applyTheme(); // Применяем текущую тему

        // Добавляем компонент для выбора темы
        Lampa.SettingsApi.addComponent({
            component: 'theme_mod',
            name: 'LampaColor Theme',
            icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>'
        });

        // Параметр для выбора темы
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
                InterFaceMod.settings.theme = value; // Сохраняем выбранную тему
                Lampa.Storage.set('theme_select', value); // Сохраняем в хранилище
                applyTheme(); // Применяем новую тему

                // Если выбрана персональная тема, отображаем палитру цветов
                if (value === 'custom') {
                    document.getElementById('colorPalette').style.display = 'flex';
                } else {
                    document.getElementById('colorPalette').style.display = 'none';
                }
            }
        });

        // Добавляем палитру цветов
        Lampa.SettingsApi.addParam({
            component: 'theme_mod',
            param: {
                name: 'custom_color_palette',
                type: 'html',
                html: createColorPalette()
            },
            field: {
                name: 'Цвет персональной темы',
                description: 'Выберите свой любимый цвет для персональной темы'
            },
            condition: () => InterFaceMod.settings.theme === 'custom', // Показываем только для персональной темы
        });

        // Обработчик изменения цвета из палитры
        document.addEventListener('click', function (event) {
            if (event.target && event.target.classList.contains('colorSwatch')) {
                const selectedColor = event.target.getAttribute('data-color');
                InterFaceMod.settings.customColor = selectedColor; // Сохраняем выбранный цвет
                Lampa.Storage.set('custom_color', selectedColor); // Сохраняем цвет в хранилище
                if (InterFaceMod.settings.theme === 'custom') {
                    applyTheme(); // Применяем новый цвет
                }
            }
        });
    }

    // Запуск плагина после готовности приложения
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
        version: '1.0.5',
        description: 'Тема оформления с персональным цветом'
    };

    window.lampa_theme = InterFaceMod;
})();
