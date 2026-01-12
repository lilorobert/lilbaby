(function() {
    'use strict';

    const GradientBackground = {
        name: 'Animated Gradient Background',
        version: '2.0.0',
        author: 'Lampa Community',
        description: 'Плавный анимированный градиентный фон',
        
        settings: {
            enabled: true,
            // Цвета градиента (можно добавлять больше)
            colors: [
                '#FF6B6B', '#FFE66D', '#4ECDC4', '#1A535C', 
                '#6A0572', '#AB83A1', '#3D5A80', '#98C1D9'
            ],
            speed: 0.5,          // Скорость анимации
            transitionDuration: 8, // Длительность перехода между цветами
            gradientType: 'radial', // 'radial', 'linear', 'conic'
            blendMode: 'screen'     // Режим наложения
        },
        
        canvas: null,
        ctx: null,
        animationId: null,
        currentTime: 0,
        
        init: function() {
            this.applyBackground();
            console.log('Gradient Background: Plugin initialized');
        },
        
        applyBackground: function() {
            if (!this.settings.enabled) {
                this.removeBackground();
                return;
            }
            
            let background = document.querySelector('.background');
            if (!background) {
                console.error('Gradient Background: Background element not found');
                return;
            }
            
            // Сохраняем оригинальный фон
            if (!background.dataset.originalContent) {
                background.dataset.originalContent = background.innerHTML;
            }
            
            // Очищаем существующий фон
            background.innerHTML = '';
            
            // Создаем canvas
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'gradient-bg-' + Date.now();
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                pointer-events: none;
            `;
            
            background.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            
            // Настраиваем размеры canvas
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
            
            // Запускаем анимацию
            this.startAnimation();
        },
        
        resizeCanvas: function() {
            if (this.canvas) {
                const dpr = window.devicePixelRatio || 1;
                this.canvas.width = window.innerWidth * dpr;
                this.canvas.height = window.innerHeight * dpr;
                this.canvas.style.width = window.innerWidth + 'px';
                this.canvas.style.height = window.innerHeight + 'px';
                this.ctx.scale(dpr, dpr);
            }
        },
        
        startAnimation: function() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            
            const animate = () => {
                this.currentTime += 0.01 * this.settings.speed;
                this.drawGradient();
                this.animationId = requestAnimationFrame(animate);
            };
            
            animate();
        },
        
        drawGradient: function() {
            if (!this.ctx || !this.canvas) return;
            
            const width = window.innerWidth;
            const height = window.innerHeight;
            const time = this.currentTime;
            
            // Очищаем canvas
            this.ctx.clearRect(0, 0, width, height);
            
            // Создаем плавно меняющиеся цвета
            const colorCount = this.settings.colors.length;
            const colorIndex1 = Math.floor(time * 100) % colorCount;
            const colorIndex2 = (colorIndex1 + 1) % colorCount;
            const t = (time * 100) % 1;
            
            const color1 = this.hexToRgb(this.settings.colors[colorIndex1]);
            const color2 = this.hexToRgb(this.settings.colors[colorIndex2]);
            
            // Интерполируем цвета
            const r = Math.floor(color1.r * (1 - t) + color2.r * t);
            const g = Math.floor(color1.g * (1 - t) + color2.g * t);
            const b = Math.floor(color1.b * (1 - t) + color2.b * t);
            
            const currentColor = `rgb(${r}, ${g}, ${b})`;
            
            // Создаем градиент в зависимости от типа
            let gradient;
            
            switch(this.settings.gradientType) {
                case 'radial':
                    gradient = this.ctx.createRadialGradient(
                        width / 2, height / 2, 0,
                        width / 2, height / 2, Math.max(width, height) / 2
                    );
                    break;
                    
                case 'linear':
                    const angle = (time * 360) % 360;
                    const radians = angle * Math.PI / 180;
                    const x1 = width / 2 + Math.cos(radians) * width;
                    const y1 = height / 2 + Math.sin(radians) * height;
                    gradient = this.ctx.createLinearGradient(
                        width / 2, height / 2, x1, y1
                    );
                    break;
                    
                case 'conic':
                    // Для conic градиента создаем сложный эффект
                    this.drawConicGradient(time);
                    return;
            }
            
            // Добавляем цветовые остановки
            gradient.addColorStop(0, currentColor);
            gradient.addColorStop(0.5, this.interpolateColor(
                this.settings.colors[(colorIndex1 + 2) % colorCount],
                this.settings.colors[(colorIndex2 + 2) % colorCount],
                t
            ));
            gradient.addColorStop(1, this.settings.colors[(colorIndex1 + 3) % colorCount]);
            
            // Заполняем фон
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, width, height);
            
            // Добавляем дополнительные эффекты
            this.addSpecialEffects(time);
        },
        
        drawConicGradient: function(time) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.max(width, height) / 2;
            
            // Создаем круговой градиент
            for (let angle = 0; angle < 360; angle += 1) {
                const radians = (angle + time * 50) * Math.PI / 180;
                const colorAngle = (angle + time * 100) % 360;
                
                // Вычисляем цвет на основе угла
                const hue = (colorAngle + time * 50) % 360;
                const color = `hsl(${hue}, 70%, 50%)`;
                
                // Рисуем сектор
                this.ctx.beginPath();
                this.ctx.moveTo(centerX, centerY);
                this.ctx.arc(
                    centerX, centerY, radius,
                    radians, radians + Math.PI / 180
                );
                this.ctx.closePath();
                
                this.ctx.fillStyle = color;
                this.ctx.fill();
            }
        },
        
        addSpecialEffects: function(time) {
            // Добавляем мерцающие частицы
            const particleCount = 50;
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            for (let i = 0; i < particleCount; i++) {
                const x = (Math.sin(time * 2 + i) * 0.5 + 0.5) * width;
                const y = (Math.cos(time * 1.5 + i) * 0.5 + 0.5) * height;
                const size = (Math.sin(time * 3 + i) * 0.5 + 0.5) * 3;
                const opacity = (Math.sin(time * 4 + i) * 0.5 + 0.5) * 0.3;
                
                this.ctx.beginPath();
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                this.ctx.fill();
            }
            
            // Добавляем волны
            this.ctx.beginPath();
            for (let x = 0; x < width; x += 10) {
                const y = height / 2 + Math.sin(x * 0.01 + time * 2) * 20;
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        },
        
        hexToRgb: function(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : {r: 0, g: 0, b: 0};
        },
        
        interpolateColor: function(color1, color2, t) {
            const c1 = this.hexToRgb(color1);
            const c2 = this.hexToRgb(color2);
            
            const r = Math.floor(c1.r * (1 - t) + c2.r * t);
            const g = Math.floor(c1.g * (1 - t) + c2.g * t);
            const b = Math.floor(c1.b * (1 - t) + c2.b * t);
            
            return `rgb(${r}, ${g}, ${b})`;
        },
        
        removeBackground: function() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            
            const background = document.querySelector('.background');
            if (background && background.dataset.originalContent) {
                background.innerHTML = background.dataset.originalContent;
            }
            
            window.removeEventListener('resize', () => this.resizeCanvas());
        },
        
        updateSettings: function(newSettings) {
            Object.assign(this.settings, newSettings);
            if (this.animationId) {
                this.removeBackground();
                this.applyBackground();
            }
        }
    };
    
    // Инициализация плагина
    function initGradientBackground() {
        if (typeof Lampa === 'undefined') {
            setTimeout(initGradientBackground, 500);
            return;
        }
        
        // Загружаем сохраненные настройки
        try {
            const saved = localStorage.getItem('gradient_bg_settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                GradientBackground.settings = {...GradientBackground.settings, ...parsed};
            }
        } catch (e) {
            console.error('Failed to load gradient background settings:', e);
        }
        
        // Запускаем с задержкой
        setTimeout(() => {
            GradientBackground.init();
        }, 2000);
        
        // Сохраняем в глобальную область видимости
        window.GradientBackground = GradientBackground;
    }
    
    // Запуск при загрузке
    document.addEventListener('DOMContentLoaded', initGradientBackground);
    
    // Альтернативный запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGradientBackground);
    } else {
        initGradientBackground();
    }
    
})();