(function() {
    'use strict';

    const SmartGradient = {
        name: 'Smart Adaptive Gradient',
        version: '4.0.0',
        description: 'Градиент, подстраивающийся под цвета контента',
        
        settings: {
            enabled: true,
            analysisMode: 'dominant', // 'dominant', 'average', 'vibrant'
            blurAmount: 40,
            opacity: 0.6,
            animationSpeed: 0.2,
            usePosters: true,
            useBackground: true,
            updateInterval: 3000,
            quality: 'medium' // 'low', 'medium', 'high'
        },
        
        canvas: null,
        ctx: null,
        offscreenCanvas: null,
        offscreenCtx: null,
        animationId: null,
        currentColors: {
            primary: '#1a1a2e',
            secondary: '#16213e',
            accent: '#0f3460'
        },
        targetColors: {
            primary: '#1a1a2e',
            secondary: '#16213e',
            accent: '#0f3460'
        },
        
        init: function() {
            this.setupCanvas();
            this.startColorAnalysis();
            this.applyBackground();
            
            console.log('Smart Gradient: Plugin initialized');
        },
        
        setupCanvas: function() {
            this.canvas = document.createElement('canvas');
            this.canvas.className = 'smart-gradient-bg';
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: -1;
                pointer-events: none;
                opacity: ${this.settings.opacity};
                filter: blur(${this.settings.blurAmount}px);
            `;
            
            this.offscreenCanvas = document.createElement('canvas');
            this.offscreenCtx = this.offscreenCanvas.getContext('2d', { willReadFrequently: true });
        },
        
        applyBackground: function() {
            const background = document.querySelector('.background');
            if (!background) {
                setTimeout(() => this.applyBackground(), 500);
                return;
            }
            
            // Сохраняем оригинальный фон
            if (!background.dataset.originalContent) {
                background.dataset.originalContent = background.innerHTML;
            }
            
            background.innerHTML = '';
            background.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
            
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
        
        startColorAnalysis: function() {
            // Анализируем цвета каждые N секунд
            setInterval(() => {
                this.analyzeContentColors();
            }, this.settings.updateInterval);
            
            // Первоначальный анализ
            setTimeout(() => this.analyzeContentColors(), 2000);
            
            // Анализ при смене контента
            this.setupMutationObserver();
        },
        
        setupMutationObserver: function() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes.length > 0) {
                        setTimeout(() => this.analyzeContentColors(), 500);
                    }
                });
            });
            
            // Наблюдаем за основным контейнером контента
            const contentContainer = document.querySelector('.content, .container, main') || document.body;
            if (contentContainer) {
                observer.observe(contentContainer, {
                    childList: true,
                    subtree: true
                });
            }
        },
        
        analyzeContentColors: function() {
            if (!this.settings.enabled) return;
            
            const colors = [];
            
            // 1. Анализируем постеры
            if (this.settings.usePosters) {
                const posters = document.querySelectorAll('img[src*="poster"], .poster img, [class*="poster"] img');
                posters.forEach(poster => {
                    const color = this.extractColorFromImage(poster);
                    if (color) colors.push(color);
                });
            }
            
            // 2. Анализируем фоновые изображения
            if (this.settings.useBackground) {
                const bgImages = document.querySelectorAll('[style*="background-image"]');
                bgImages.forEach(element => {
                    const bgColor = this.extractColorFromBackground(element);
                    if (bgColor) colors.push(bgColor);
                });
            }
            
            // 3. Анализируем доминирующие цвета страницы
            const dominantColors = this.getDominantPageColors();
            colors.push(...dominantColors);
            
            if (colors.length > 0) {
                this.calculateTargetColors(colors);
            }
        },
        
        extractColorFromImage: function(imgElement) {
            return new Promise(resolve => {
                if (!imgElement.complete || imgElement.naturalWidth === 0) {
                    resolve(null);
                    return;
                }
                
                try {
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');
                    
                    tempCanvas.width = 100;
                    tempCanvas.height = 100;
                    
                    tempCtx.drawImage(imgElement, 0, 0, 100, 100);
                    
                    const imageData = tempCtx.getImageData(0, 0, 100, 100);
                    const color = this.analyzeImageData(imageData);
                    
                    resolve(color);
                } catch (error) {
                    console.log('Smart Gradient: Error analyzing image:', error);
                    resolve(null);
                }
            }).then(color => color);
        },
        
        extractColorFromBackground: function(element) {
            const style = window.getComputedStyle(element);
            const bgImage = style.backgroundImage;
            
            if (!bgImage || bgImage === 'none') return null;
            
            // Извлекаем URL изображения
            const urlMatch = bgImage.match(/url\(["']?(.*?)["']?\)/);
            if (!urlMatch) return null;
            
            const imageUrl = urlMatch[1];
            
            return new Promise(resolve => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    try {
                        const tempCanvas = document.createElement('canvas');
                        const tempCtx = tempCanvas.getContext('2d');
                        
                        tempCanvas.width = 100;
                        tempCanvas.height = 100;
                        tempCtx.drawImage(img, 0, 0, 100, 100);
                        
                        const imageData = tempCtx.getImageData(0, 0, 100, 100);
                        const color = this.analyzeImageData(imageData);
                        resolve(color);
                    } catch (error) {
                        resolve(null);
                    }
                };
                img.onerror = () => resolve(null);
                img.src = imageUrl;
            }).then(color => color);
        },
        
        getDominantPageColors: function() {
            const colors = [];
            
            // Анализируем видимую область экрана (только если высокое качество)
            if (this.settings.quality === 'high') {
                try {
                    // Используем offscreen canvas для скриншота
                    this.offscreenCtx.drawWindow ?
                        this.offscreenCtx.drawWindow(window, 0, 0, window.innerWidth, window.innerHeight, 'rgb(255,255,255)') :
                        null;
                    
                    const imageData = this.offscreenCtx.getImageData(0, 0, 
                        Math.min(200, window.innerWidth), 
                        Math.min(200, window.innerHeight)
                    );
                    
                    const dominantColor = this.analyzeImageData(imageData);
                    if (dominantColor) colors.push(dominantColor);
                } catch (error) {
                    // fallback: анализируем основные элементы
                    const mainElements = document.querySelectorAll('div, section, article, header');
                    mainElements.forEach((el, index) => {
                        if (index < 10) { // Ограничиваем количество
                            const bgColor = window.getComputedStyle(el).backgroundColor;
                            if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                                const rgb = this.rgbStringToHex(bgColor);
                                if (rgb) colors.push(rgb);
                            }
                        }
                    });
                }
            }
            
            return colors;
        },
        
        analyzeImageData: function(imageData) {
            const data = imageData.data;
            const colorCount = {};
            let maxCount = 0;
            let dominantColor = null;
            
            // Анализируем каждый 10-й пиксель для оптимизации
            for (let i = 0; i < data.length; i += 40) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                // Пропускаем слишком темные и слишком светлые пиксели
                if (r + g + b < 30 || r + g + b > 750) continue;
                
                // Квантуем цвета для группировки
                const quantized = `${Math.floor(r / 32) * 32},${Math.floor(g / 32) * 32},${Math.floor(b / 32) * 32}`;
                
                colorCount[quantized] = (colorCount[quantized] || 0) + 1;
                
                if (colorCount[quantized] > maxCount) {
                    maxCount = colorCount[quantized];
                    dominantColor = quantized.split(',').map(Number);
                }
            }
            
            if (dominantColor) {
                return this.rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);
            }
            
            // Fallback: средний цвет
            let totalR = 0, totalG = 0, totalB = 0, pixelCount = 0;
            
            for (let i = 0; i < data.length; i += 40) {
                totalR += data[i];
                totalG += data[i + 1];
                totalB += data[i + 2];
                pixelCount++;
            }
            
            if (pixelCount > 0) {
                return this.rgbToHex(
                    Math.floor(totalR / pixelCount),
                    Math.floor(totalG / pixelCount),
                    Math.floor(totalB / pixelCount)
                );
            }
            
            return null;
        },
        
        calculateTargetColors: function(colorHexes) {
            if (colorHexes.length === 0) return;
            
            let primary = null;
            let secondary = null;
            let accent = null;
            
            switch (this.settings.analysisMode) {
                case 'dominant':
                    // Самый частый цвет становится primary
                    const colorFrequency = {};
                    colorHexes.forEach(hex => {
                        colorFrequency[hex] = (colorFrequency[hex] || 0) + 1;
                    });
                    
                    const sortedColors = Object.keys(colorFrequency)
                        .sort((a, b) => colorFrequency[b] - colorFrequency[a]);
                    
                    primary = sortedColors[0] || '#1a1a2e';
                    secondary = sortedColors[1] || this.adjustColor(primary, 30);
                    accent = sortedColors[2] || this.adjustColor(primary, -30);
                    break;
                    
                case 'average':
                    // Усредняем все цвета
                    const avgColor = this.averageColors(colorHexes);
                    primary = avgColor;
                    secondary = this.adjustColor(avgColor, 40);
                    accent = this.adjustColor(avgColor, -40);
                    break;
                    
                case 'vibrant':
                    // Ищем самый насыщенный цвет
                    const vibrant = this.findMostVibrantColor(colorHexes);
                    primary = vibrant;
                    secondary = this.desaturateColor(vibrant, 0.5);
                    accent = this.adjustColor(vibrant, 60);
                    break;
            }
            
            this.targetColors = {
                primary: primary || '#1a1a2e',
                secondary: secondary || this.adjustColor(primary, 30),
                accent: accent || this.adjustColor(primary, -30)
            };
            
            // Затемняем цвета для фона
            this.targetColors.primary = this.darkenColor(this.targetColors.primary, 0.7);
            this.targetColors.secondary = this.darkenColor(this.targetColors.secondary, 0.8);
            this.targetColors.accent = this.darkenColor(this.targetColors.accent, 0.9);
        },
        
        startAnimation: function() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            
            const animate = () => {
                // Плавная интерполяция цветов
                this.currentColors.primary = this.interpolateColor(
                    this.currentColors.primary,
                    this.targetColors.primary,
                    0.05 * this.settings.animationSpeed
                );
                
                this.currentColors.secondary = this.interpolateColor(
                    this.currentColors.secondary,
                    this.targetColors.secondary,
                    0.05 * this.settings.animationSpeed
                );
                
                this.currentColors.accent = this.interpolateColor(
                    this.currentColors.accent,
                    this.targetColors.accent,
                    0.05 * this.settings.animationSpeed
                );
                
                this.drawGradient();
                this.animationId = requestAnimationFrame(animate);
            };
            
            animate();
        },
        
        drawGradient: function() {
            if (!this.ctx || !this.canvas) return;
            
            const width = this.canvas.width;
            const height = this.canvas.height;
            
            // Очищаем с прозрачностью для плавности
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.fillRect(0, 0, width, height);
            
            // Создаем сложный градиент
            const time = Date.now() * 0.0001 * this.settings.animationSpeed;
            
            // Основной радиальный градиент
            const gradient1 = this.ctx.createRadialGradient(
                width * (0.5 + Math.sin(time) * 0.1),
                height * (0.3 + Math.cos(time * 0.7) * 0.05),
                0,
                width * 0.5,
                height * 0.5,
                Math.max(width, height) * 0.8
            );
            
            gradient1.addColorStop(0, this.currentColors.primary);
            gradient1.addColorStop(0.5, this.currentColors.secondary);
            gradient1.addColorStop(1, this.currentColors.accent);
            
            this.ctx.globalAlpha = 0.5;
            this.ctx.fillStyle = gradient1;
            this.ctx.fillRect(0, 0, width, height);
            
            // Второй градиент для глубины
            const gradient2 = this.ctx.createLinearGradient(
                0, 0,
                width * Math.sin(time * 0.3),
                height * Math.cos(time * 0.5)
            );
            
            const lightPrimary = this.lightenColor(this.currentColors.primary, 0.2);
            const darkAccent = this.darkenColor(this.currentColors.accent, 0.3);
            
            gradient2.addColorStop(0, lightPrimary + '40');
            gradient2.addColorStop(1, darkAccent + '20');
            
            this.ctx.globalAlpha = 0.3;
            this.ctx.fillStyle = gradient2;
            this.ctx.fillRect(0, 0, width, height);
            
            // Текстура шума
            this.drawNoiseTexture();
            
            this.ctx.globalAlpha = 1.0;
        },
        
        drawNoiseTexture: function() {
            if (!this.noiseTexture || this.noiseTexture.width !== this.canvas.width) {
                this.generateNoiseTexture();
            }
            
            this.ctx.globalAlpha = 0.02;
            this.ctx.drawImage(this.noiseTexture, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.globalAlpha = 1.0;
        },
        
        generateNoiseTexture: function() {
            this.noiseTexture = document.createElement('canvas');
            this.noiseTexture.width = this.canvas.width;
            this.noiseTexture.height = this.canvas.height;
            const noiseCtx = this.noiseTexture.getContext('2d');
            const imageData = noiseCtx.createImageData(this.noiseTexture.width, this.noiseTexture.height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 10;
                data[i] = data[i + 1] = data[i + 2] = value;
                data[i + 3] = 5;
            }
            
            noiseCtx.putImageData(imageData, 0, 0);
        },
        
        // Вспомогательные функции для работы с цветами
        rgbToHex: function(r, g, b) {
            return '#' + [r, g, b].map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('');
        },
        
        hexToRgb: function(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : {r: 0, g: 0, b: 0};
        },
        
        rgbStringToHex: function(rgbString) {
            const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
                return this.rgbToHex(
                    parseInt(match[1]),
                    parseInt(match[2]),
                    parseInt(match[3])
                );
            }
            return null;
        },
        
        averageColors: function(colors) {
            let totalR = 0, totalG = 0, totalB = 0;
            
            colors.forEach(hex => {
                const rgb = this.hexToRgb(hex);
                totalR += rgb.r;
                totalG += rgb.g;
                totalB += rgb.b;
            });
            
            return this.rgbToHex(
                Math.floor(totalR / colors.length),
                Math.floor(totalG / colors.length),
                Math.floor(totalB / colors.length)
            );
        },
        
        findMostVibrantColor: function(colors) {
            let maxSaturation = -1;
            let vibrantColor = colors[0];
            
            colors.forEach(hex => {
                const rgb = this.hexToRgb(hex);
                const hsv = this.rgbToHsv(rgb.r, rgb.g, rgb.b);
                if (hsv.s > maxSaturation && hsv.v > 0.3 && hsv.v < 0.9) {
                    maxSaturation = hsv.s;
                    vibrantColor = hex;
                }
            });
            
            return vibrantColor;
        },
        
        rgbToHsv: function(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, v = max;
            
            const d = max - min;
            s = max === 0 ? 0 : d / max;
            
            if (max === min) {
                h = 0;
            } else {
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            
            return { h, s, v };
        },
        
        adjustColor: function(hex, amount) {
            const rgb = this.hexToRgb(hex);
            
            return this.rgbToHex(
                Math.max(0, Math.min(255, rgb.r + amount)),
                Math.max(0, Math.min(255, rgb.g + amount)),
                Math.max(0, Math.min(255, rgb.b + amount))
            );
        },
        
        darkenColor: function(hex, factor) {
            const rgb = this.hexToRgb(hex);
            
            return this.rgbToHex(
                Math.floor(rgb.r * factor),
                Math.floor(rgb.g * factor),
                Math.floor(rgb.b * factor)
            );
        },
        
        lightenColor: function(hex, factor) {
            const rgb = this.hexToRgb(hex);
            
            return this.rgbToHex(
                Math.min(255, Math.floor(rgb.r * (1 + factor))),
                Math.min(255, Math.floor(rgb.g * (1 + factor))),
                Math.min(255, Math.floor(rgb.b * (1 + factor)))
            );
        },
        
        desaturateColor: function(hex, amount) {
            const rgb = this.hexToRgb(hex);
            const gray = (rgb.r + rgb.g + rgb.b) / 3;
            
            return this.rgbToHex(
                Math.floor(rgb.r * (1 - amount) + gray * amount),
                Math.floor(rgb.g * (1 - amount) + gray * amount),
                Math.floor(rgb.b * (1 - amount) + gray * amount)
            );
        },
        
        interpolateColor: function(color1, color2, t) {
            const rgb1 = this.hexToRgb(color1);
            const rgb2 = this.hexToRgb(color2);
            
            return this.rgbToHex(
                Math.floor(rgb1.r * (1 - t) + rgb2.r * t),
                Math.floor(rgb1.g * (1 - t) + rgb2.g * t),
                Math.floor(rgb1.b * (1 - t) + rgb2.b * t)
            );
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
        },
        
        // Методы для ручного управления
        setAnalysisMode: function(mode) {
            this.settings.analysisMode = mode;
            this.analyzeContentColors();
        },
        
        setOpacity: function(opacity) {
            this.settings.opacity = opacity;
            if (this.canvas) {
                this.canvas.style.opacity = opacity;
            }
        },
        
        forceUpdate: function() {
            this.analyzeContentColors();
        },
        
        setCustomColors: function(primary, secondary, accent) {
            this.targetColors = {
                primary: this.darkenColor(primary, 0.7),
                secondary: this.darkenColor(secondary, 0.8),
                accent: this.darkenColor(accent, 0.9)
            };
        }
    };
    
    // Инициализация
    function initSmartGradient() {
        if (typeof Lampa === 'undefined') {
            setTimeout(initSmartGradient, 1000);
            return;
        }
        
        setTimeout(() => {
            SmartGradient.init();
            
            window.SmartGradient = SmartGradient;
            
            console.log('Smart Adaptive Gradient: Ready');
            console.log('Анализ: ' + SmartGradient.settings.analysisMode);
            console.log('Интервал обновления: ' + SmartGradient.settings.updateInterval + 'мс');
            console.log('Команды:');
            console.log('SmartGradient.setAnalysisMode("dominant")');
            console.log('SmartGradient.setOpacity(0.6)');
            console.log('SmartGradient.forceUpdate()');
            console.log('SmartGradient.setCustomColors("#FF0000", "#00FF00", "#0000FF")');
        }, 3000);
    }
    
    // Автоматический запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmartGradient);
    } else {
        initSmartGradient();
    }
    
})();
