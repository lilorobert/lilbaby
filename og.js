/*
 * Vanta.js Evening Sky Plugin for Lampa
 * Beautiful evening sky background using Vanta.js
 */

(function() {
    'use strict';

    // Проверяем доступность Vanta.js и Three.js
    function checkDependencies() {
        if (typeof VANTA === 'undefined' || typeof VANTA.FOG === 'undefined') {
            console.log('Evening Sky: Loading dependencies...');
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js', function() {
                loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js', initPlugin);
            });
            return false;
        }
        return true;
    }

    // Динамическая загрузка скриптов
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = callback;
        script.onerror = function() {
            console.error('Evening Sky: Failed to load script:', src);
        };
        document.head.appendChild(script);
    }

    // Генератор звезд
    function createStarsBackground() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const stars = [];
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Создаем звезды
        const starCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 5000));
        
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.2 + 0.5,
                brightness: Math.random() * 0.7 + 0.3,
                twinkleSpeed: Math.random() * 0.05 + 0.02
            });
        }
        
        // Функция отрисовки
        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Вечерний градиент
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#1a1a2e');     // Темно-синий верх
            gradient.addColorStop(0.5, '#16213e');   // Синий
            gradient.addColorStop(0.7, '#0f3460');   // Полуночный синий
            gradient.addColorStop(1, '#533483');     // Фиолетовый низ
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Рисуем звезды
            const time = Date.now() * 0.001;
            
            stars.forEach(star => {
                // Мерцание звезд
                const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
                const alpha = star.brightness * twinkle;
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
                
                // Эффект свечения для ярких звезд
                if (star.brightness > 0.6) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
                    const glowAlpha = alpha * 0.3;
                    ctx.fillStyle = `rgba(255, 255, 255, ${glowAlpha})`;
                    ctx.fill();
                }
            });
            
            // Некоторые "особые" цветные звезды
            const specialStars = stars.filter((_, i) => i % 20 === 0);
            specialStars.forEach((star, index) => {
                const colors = [
                    'rgba(255, 200, 150, 0.8)', // Теплый свет
                    'rgba(150, 200, 255, 0.8)', // Голубой
                    'rgba(255, 150, 200, 0.8)'  // Розовый
                ];
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = colors[index % colors.length];
                ctx.fill();
            });
            
            requestAnimationFrame(drawStars);
        }
        
        drawStars();
        
        // Обработка изменения размера
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Обновляем позиции звезд
            stars.forEach(star => {
                star.x = Math.random() * canvas.width;
                star.y = Math.random() * canvas.height;
            });
        });
        
        return canvas;
    }

    // Инициализация плагина
    function initPlugin() {
        console.log('Evening Sky: Initializing beautiful evening background...');
        
        // Ждем пока Lampa полностью загрузится
        if (typeof Lampa === 'undefined') {
            setTimeout(initPlugin, 500);
            return;
        }

        // Создаем конфигурацию плагина
        const EveningSkyBackground = {
            name: 'Evening Sky Background',
            version: '2.0.0',
            author: 'Lampa Community',
            description: 'Красивый вечерний фон с звездами и градиентом',
            
            // Настройки вечерней темы
            settings: {
                enabled: true,
                theme: 'deep_purple', // deep_purple, sunset, night_blue, cosmic
                showStars: true,
                starDensity: 0.8,
                animationSpeed: 0.3,
                showMoon: true,
                fogIntensity: 0.7
            },
            
            vantaEffect: null,
            starsCanvas: null,
            currentTheme: null,
            
            // Тематические настройки
            themes: {
                deep_purple: {
                    highlightColor: '#E0C3FC',  // Светло-фиолетовый
                    midtoneColor: '#8A2BE2',    // Синий фиолетовый
                    lowlightColor: '#4B0082',   // Индиго
                    baseColor: '#9370DB',       // Средне-фиолетовый
                    gradientTop: '#1a1a2e',
                    gradientMiddle: '#16213e',
                    gradientBottom: '#533483'
                },
                sunset: {
                    highlightColor: '#FFB347',  // Светло-оранжевый
                    midtoneColor: '#FF8C00',    // Темно-оранжевый
                    lowlightColor: '#8B0000',   // Темно-красный
                    baseColor: '#FF6347',       // Томатный
                    gradientTop: '#1a1a2e',
                    gradientMiddle: '#0f3460',
                    gradientBottom: '#FF8C00'
                },
                night_blue: {
                    highlightColor: '#89CFF0',  // Детский синий
                    midtoneColor: '#1E90FF',    // Ярко-синий
                    lowlightColor: '#000080',   // Темно-синий
                    baseColor: '#4682B4',       // Стальной синий
                    gradientTop: '#0a192f',
                    gradientMiddle: '#112240',
                    gradientBottom: '#233554'
                },
                cosmic: {
                    highlightColor: '#D8BFD8',  // Чертополох
                    midtoneColor: '#9370DB',    // Средне-фиолетовый
                    lowlightColor: '#4B0082',   // Индиго
                    baseColor: '#6A5ACD',       // Сланцево-синий
                    gradientTop: '#0f0c29',
                    gradientMiddle: '#302b63',
                    gradientBottom: '#24243e'
                }
            },
            
            // Инициализация
            init: function() {
                this.applyBackground();
                console.log('Evening Sky: Plugin initialized with ' + this.settings.theme + ' theme');
            },
            
            // Применение фона
            applyBackground: function() {
                if (!this.settings.enabled) {
                    this.removeBackground();
                    return;
                }
                
                // Находим элемент фона Lampa
                let background = document.querySelector('.background');
                
                if (!background) {
                    console.error('Evening Sky: Background element not found');
                    return;
                }
                
                // Сохраняем оригинальный фон
                if (!background.dataset.originalContent) {
                    background.dataset.originalContent = background.innerHTML;
                }
                
                // Очищаем существующий фон
                background.innerHTML = '';
                
                // Применяем стили
                this.applyStyles(background);
                
                // Создаем основной фон
                this.createEveningBackground(background);
                
                // Добавляем звезды если включено
                if (this.settings.showStars) {
                    this.addStars(background);
                }
                
                // Добавляем луну если включено
                if (this.settings.showMoon) {
                    this.addMoon(background);
                }
            },
            
            // Применение стилей
            applyStyles: function(element) {
                element.style.position = 'fixed';
                element.style.top = '0';
                element.style.left = '0';
                element.style.width = '100%';
                element.style.height = '100%';
                element.style.zIndex = '-1';
                element.style.overflow = 'hidden';
            },
            
            // Создание вечернего фона с Vanta.js
            createEveningBackground: function(container) {
                const elementId = 'evening-bg-' + Date.now();
                container.id = elementId;
                
                // Получаем настройки текущей темы
                const theme = this.themes[this.settings.theme];
                this.currentTheme = theme;
                
                try {
                    // Создаем Vanta эффект с плавной анимацией
                    this.vantaEffect = VANTA.FOG({
                        el: '#' + elementId,
                        mouseControls: false,
                        touchControls: false,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        highlightColor: this.hexToThreeColor(theme.highlightColor),
                        midtoneColor: this.hexToThreeColor(theme.midtoneColor),
                        lowlightColor: this.hexToThreeColor(theme.lowlightColor),
                        baseColor: this.hexToThreeColor(theme.baseColor),
                        speed: this.settings.animationSpeed, // Плавная медленная анимация
                        zoom: 0.9,
                        blurFactor: 0.6
                    });
                    
                    // Добавляем плавные изменения цвета со временем
                    this.startColorTransitions();
                    
                } catch (error) {
                    console.error('Evening Sky: Failed to create Vanta effect:', error);
                    this.createGradientFallback(container, theme);
                }
            },
            
            // Добавление анимированных звезд
            addStars: function(container) {
                if (this.starsCanvas) {
                    this.starsCanvas.remove();
                }
                
                this.starsCanvas = createStarsBackground();
                this.starsCanvas.style.position = 'absolute';
                this.starsCanvas.style.top = '0';
                this.starsCanvas.style.left = '0';
                this.starsCanvas.style.width = '100%';
                this.starsCanvas.style.height = '100%';
                this.starsCanvas.style.zIndex = '1';
                this.starsCanvas.style.opacity = this.settings.starDensity;
                this.starsCanvas.style.pointerEvents = 'none';
                
                container.appendChild(this.starsCanvas);
            },
            
            // Добавление луны
            addMoon: function(container) {
                const moon = document.createElement('div');
                moon.className = 'evening-moon';
                
                // Случайная позиция в верхней части экрана
                const posX = 70 + Math.random() * 20; // 70-90%
                const posY = 10 + Math.random() * 15; // 10-25%
                
                moon.style.cssText = `
                    position: absolute;
                    top: ${posY}%;
                    left: ${posX}%;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 30% 30%, #f9f9f9, #e6e6e6);
                    box-shadow: 
                        0 0 60px rgba(255, 255, 255, 0.5),
                        0 0 100px rgba(255, 255, 200, 0.3),
                        inset -10px -10px 20px rgba(0, 0, 0, 0.1);
                    z-index: 2;
                    filter: blur(0.5px);
                    opacity: 0.9;
                    pointer-events: none;
                `;
                
                // Добавляем кратеры
                const craters = `
                    <div style="position: absolute; top: 20%; left: 20%; width: 15px; height: 15px; border-radius: 50%; background: rgba(0,0,0,0.1);"></div>
                    <div style="position: absolute; top: 40%; left: 60%; width: 25px; height: 25px; border-radius: 50%; background: rgba(0,0,0,0.15);"></div>
                    <div style="position: absolute; top: 60%; left: 30%; width: 20px; height: 20px; border-radius: 50%; background: rgba(0,0,0,0.12);"></div>
                `;
                
                moon.innerHTML = craters;
                container.appendChild(moon);
                
                // Добавляем свечение вокруг луны
                const glow = document.createElement('div');
                glow.className = 'moon-glow';
                glow.style.cssText = `
                    position: absolute;
                    top: ${posY - 5}%;
                    left: ${posX - 5}%;
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,255,200,0.1) 0%, rgba(255,255,200,0) 70%);
                    z-index: 1;
                    pointer-events: none;
                `;
                
                container.appendChild(glow);
            },
            
            // Плавные переходы цветов (имитация движения времени)
            startColorTransitions: function() {
                if (!this.vantaEffect) return;
                
                const theme = this.currentTheme;
                let time = 0;
                
                setInterval(() => {
                    if (!this.vantaEffect) return;
                    
                    time += 0.001;
                    
                    // Легкие колебания цвета для создания живой атмосферы
                    const hueShift = Math.sin(time) * 0.02;
                    
                    // Плавно меняем цвета
                    this.vantaEffect.options.highlightColor = this.hexToThreeColor(
                        this.adjustColor(theme.highlightColor, hueShift)
                    );
                    
                    this.vantaEffect.options.midtoneColor = this.hexToThreeColor(
                        this.adjustColor(theme.midtoneColor, hueShift * 0.7)
                    );
                    
                    // Обновляем эффект
                    if (this.vantaEffect.updateUniforms) {
                        this.vantaEffect.updateUniforms();
                    }
                    
                }, 100); // Обновляем каждые 100 мс
            },
            
            // Fallback на CSS градиент если Vanta не работает
            createGradientFallback: function(container, theme) {
                const gradientDiv = document.createElement('div');
                gradientDiv.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, 
                        ${theme.gradientTop} 0%, 
                        ${theme.gradientMiddle} 50%, 
                        ${theme.gradientBottom} 100%);
                    z-index: 0;
                `;
                
                container.appendChild(gradientDiv);
            },
            
            // Корректировка цвета (добавление легких вариаций)
            adjustColor: function(hex, factor) {
                // Упрощенная корректировка яркости
                const num = parseInt(hex.replace('#', ''), 16);
                const r = Math.min(255, Math.max(0, ((num >> 16) & 0xFF) * (1 + factor)));
                const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) * (1 + factor * 0.8)));
                const b = Math.min(255, Math.max(0, (num & 0xFF) * (1 + factor * 0.6)));
                
                return '#' + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1);
            },
            
            // Конвертация цвета
            hexToThreeColor: function(hex) {
                hex = hex.replace('#', '');
                if (hex.length === 3) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                }
                return parseInt('0x' + hex);
            },
            
            // Удаление фона
            removeBackground: function() {
                if (this.vantaEffect) {
                    try {
                        this.vantaEffect.destroy();
                    } catch(e) {}
                    this.vantaEffect = null;
                }
                
                if (this.starsCanvas) {
                    this.starsCanvas.remove();
                    this.starsCanvas = null;
                }
                
                const background = document.querySelector('.background');
                if (background && background.dataset.originalContent) {
                    background.innerHTML = background.dataset.originalContent;
                    background.removeAttribute('id');
                    background.style.cssText = '';
                }
                
                // Удаляем луну
                const moon = document.querySelector('.evening-moon');
                const glow = document.querySelector('.moon-glow');
                if (moon) moon.remove();
                if (glow) glow.remove();
            },
            
            // Обработка изменения размера окна
            handleResize: function() {
                if (this.vantaEffect && this.vantaEffect.resize) {
                    this.vantaEffect.resize();
                }
                
                // Пересоздаем звезды при изменении размера
                if (this.settings.showStars && this.starsCanvas) {
                    const container = document.querySelector('.background');
                    if (container) {
                        this.starsCanvas.remove();
                        this.addStars(container);
                    }
                }
            },
            
            // Переключение темы
            setTheme: function(themeName) {
                if (this.themes[themeName]) {
                    this.settings.theme = themeName;
                    this.removeBackground();
                    setTimeout(() => this.applyBackground(), 100);
                }
            }
        };
        
        // Инициализируем плагин
        setTimeout(() => {
            EveningSkyBackground.init();
            
            // Добавляем обработчик изменения размера
            window.addEventListener('resize', function() {
                EveningSkyBackground.handleResize();
            });
        }, 2000);
        
        // Экспортируем плагин для доступа из консоли
        window.EveningSkyBackground = EveningSkyBackground;
    }
    
    // Автоматическая проверка зависимостей и инициализация
    if (checkDependencies()) {
        setTimeout(initPlugin, 1000);
    }
    
})();