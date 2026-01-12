(function() {
    'use strict';

    const SoftGradientBackground = {
        name: 'Soft Gradient Background',
        version: '2.1.0',
        description: 'Мягкий переливающийся градиентный фон',
        
        settings: {
            enabled: true,
            // Спокойные пастельные цвета
            colors: [
                '#1a1a2e', '#16213e', '#0f3460', // Темная синяя гамма
                '#1e3c72', '#2a5298', '#6a93cb', // Более светлые синие
                '#89abe3', '#c9d6ea'             // Светлые акценты
            ],
            speed: 0.15,               // Очень медленная анимация
            brightness: 0.3,           // Яркость (0-1)
            saturation: 0.5,           // Насыщенность (0-1)
            noiseOpacity: 0.02,        // Прозрачность шума
            blurAmount: 20             // Размытие в пикселях
        },
        
        canvas: null,
        ctx: null,
        offscreenCanvas: null,
        offscreenCtx: null,
        animationId: null,
        currentTime: 0,
        noiseTexture: null,
        
        init: function() {
            this.applyBackground();
            console.log('Soft Gradient: Plugin initialized');
        },
        
        applyBackground: function() {
            if (!this.settings.enabled) {
                this.removeBackground();
                return;
            }
            
            let background = document.querySelector('.background');
            if (!background) {
                setTimeout(() => this.applyBackground(), 500);
                return;
            }
            
            // Сохраняем оригинальный фон
            if (!background.dataset.originalContent) {
                background.dataset.originalContent = background.innerHTML;
            }
            
            // Очищаем существующий фон
            background.innerHTML = '';
            
            // Создаем основной canvas
            this.canvas = document.createElement('canvas');
            this.canvas.className = 'soft-gradient-bg';
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: -1;
                pointer-events: none;
                opacity: 0.7;
                filter: blur(${this.settings.blurAmount}px);
            `;
            
            // Создаем offscreen canvas для эффектов
            this.offscreenCanvas = document.createElement('canvas');
            
            background.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.offscreenCtx = this.offscreenCanvas.getContext('2d');
            
            this.resizeCanvas();
            this.createNoiseTexture();
            
            window.addEventListener('resize', () => {
                this.resizeCanvas();
                this.createNoiseTexture();
            });
            
            this.startAnimation();
        },
        
        resizeCanvas: function() {
            if (!this.canvas) return;
            
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            [this.canvas, this.offscreenCanvas].forEach(canvas => {
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';
            });
            
            if (this.ctx) this.ctx.scale(dpr, dpr);
        },
        
        createNoiseTexture: function() {
            if (!this.offscreenCanvas) return;
            
            const width = this.offscreenCanvas.width;
            const height = this.offscreenCanvas.height;
            const imageData = this.offscreenCtx.createImageData(width, height);
            const data = imageData.data;
            
            // Создаем мягкий шум
            for (let i = 0; i < data.length; i += 4) {
                const noise = Math.random() * 10;
                data[i] = noise;     // R
                data[i + 1] = noise; // G
                data[i + 2] = noise; // B
                data[i + 3] = 5;     // A - очень прозрачный
            }
            
            this.offscreenCtx.putImageData(imageData, 0, 0);
            this.noiseTexture = this.offscreenCanvas;
        },
        
        startAnimation: function() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            
            const animate = () => {
                this.currentTime += 0.005 * this.settings.speed; // Очень медленно
                this.drawGradient();
                this.animationId = requestAnimationFrame(animate);
            };
            
            animate();
        },
        
        drawGradient: function() {
            if (!this.ctx || !this.canvas) return;
            
            const width = this.canvas.width;
            const height = this.canvas.height;
            const time = this.currentTime;
            
            // Очищаем с прозрачностью для плавного перехода
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, width, height);
            
            // Медленно меняющиеся цвета
            const colorCount = this.settings.colors.length;
            const colorIndex1 = Math.floor(time * 20) % colorCount;
            const colorIndex2 = (colorIndex1 + 1) % colorCount;
            const t = (time * 20) % 1;
            
            // Создаем радиальный градиент
            const gradient = this.ctx.createRadialGradient(
                width * (0.5 + Math.sin(time * 0.1) * 0.1),
                height * (0.5 + Math.cos(time * 0.1) * 0.1),
                0,
                width / 2,
                height / 2,
                Math.max(width, height) * 0.8
            );
            
            // Мягкие цветовые переходы
            const colors = this.getSoftColors(colorIndex1, colorIndex2, t);
            
            gradient.addColorStop(0, colors.start);
            gradient.addColorStop(0.5, colors.middle);
            gradient.addColorStop(1, colors.end);
            
            // Рисуем градиент с низкой непрозрачностью
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, width, height);
            this.ctx.globalAlpha = 1.0;
            
            // Добавляем текстуру шума
            if (this.noiseTexture) {
                this.ctx.globalAlpha = this.settings.noiseOpacity;
                this.ctx.drawImage(this.noiseTexture, 0, 0, width, height);
                this.ctx.globalAlpha = 1.0;
            }
            
            // Очень тонкие частицы (почти незаметные)
            this.drawSubtleParticles(time);
        },
        
        getSoftColors: function(index1, index2, t) {
            const color1 = this.hexToRgb(this.settings.colors[index1]);
            const color2 = this.hexToRgb(this.settings.colors[index2]);
            
            // Приглушаем цвета
            const darken = (color, amount) => ({
                r: Math.floor(color.r * amount),
                g: Math.floor(color.g * amount),
                b: Math.floor(color.b * amount)
            });
            
            const start = darken(this.interpolateColor(color1, color2, t), this.settings.brightness);
            const middle = darken(this.interpolateColor(
                this.hexToRgb(this.settings.colors[(index1 + 2) % this.settings.colors.length]),
                this.hexToRgb(this.settings.colors[(index2 + 2) % this.settings.colors.length]),
                t
            ), this.settings.brightness * 0.7);
            const end = darken(this.hexToRgb(
                this.settings.colors[(index1 + 3) % this.settings.colors.length]
            ), this.settings.brightness * 0.5);
            
            return {
                start: `rgb(${start.r}, ${start.g}, ${start.b})`,
                middle: `rgb(${middle.r}, ${middle.g}, ${middle.b})`,
                end: `rgb(${end.r}, ${end.g}, ${end.b})`
            };
        },
        
        drawSubtleParticles: function(time) {
            const particleCount = 15; // Очень мало частиц
            const width = this.canvas.width;
            const height = this.canvas.height;
            
            for (let i = 0; i < particleCount; i++) {
                // Медленное движение
                const x = (Math.sin(time * 0.5 + i * 0.5) * 0.3 + 0.5) * width;
                const y = (Math.cos(time * 0.3 + i * 0.7) * 0.3 + 0.5) * height;
                const size = (Math.sin(time + i) * 0.3 + 0.5) * 1.5; // Очень маленькие
                const opacity = (Math.sin(time * 2 + i) * 0.2 + 0.3) * 0.1; // Еле заметные
                
                this.ctx.beginPath();
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                this.ctx.fill();
            }
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
            return {
                r: Math.floor(color1.r * (1 - t) + color2.r * t),
                g: Math.floor(color1.g * (1 - t) + color2.g * t),
                b: Math.floor(color1.b * (1 - t) + color2.b * t)
            };
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
            
            this.canvas = null;
            this.ctx = null;
        },
        
        // Методы для динамического изменения настроек
        setBrightness: function(value) {
            this.settings.brightness = Math.max(0.1, Math.min(1, value));
        },
        
        setSpeed: function(value) {
            this.settings.speed = Math.max(0.05, Math.min(1, value));
        }
    };
    
    // Инициализация
    function initSoftGradient() {
        if (typeof Lampa === 'undefined') {
            setTimeout(initSoftGradient, 1000);
            return;
        }
        
        // Дополнительная задержка для полной загрузки
        setTimeout(() => {
            SoftGradientBackground.init();
            
            // Экспортируем для доступа из консоли
            window.SoftGradient = SoftGradientBackground;
            
            console.log('Soft Gradient: Ready');
            console.log('Используйте SoftGradient.setBrightness(0.3) для регулировки яркости');
            console.log('Используйте SoftGradient.setSpeed(0.1) для регулировки скорости');
        }, 3000);
    }
    
    // Автоматический запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSoftGradient);
    } else {
        initSoftGradient();
    }
    
})();
