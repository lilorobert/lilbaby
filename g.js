(function() {
    'use strict';

    const OceanBackground = {
        name: 'Animated Ocean Background',
        version: '3.0.0',
        description: 'Реалистичная анимация океанских волн',
        
        settings: {
            enabled: true,
            waveHeight: 0.5,           // Высота волн (0.1-2.0)
            waveSpeed: 0.3,            // Скорость волн (0.1-1.0)
            waterColor: '#0a192f',     // Цвет воды
            foamColor: '#a8d0e6',      // Цвет пены
            skyColor: '#1e3c72',       // Цвет неба
            sunEnabled: true,          // Солнце/луна
            depth: 0.8,                // Глубина (0.1-1.0)
            quality: 'medium'          // Качество: 'low', 'medium', 'high'
        },
        
        canvas: null,
        ctx: null,
        animationId: null,
        time: 0,
        waves: [],
        particles: [],
        
        init: function() {
            this.createWaves();
            this.applyBackground();
            console.log('Ocean Background: Plugin initialized');
        },
        
        createWaves: function() {
            this.waves = [];
            const waveCount = this.settings.quality === 'high' ? 8 : 
                            this.settings.quality === 'medium' ? 5 : 3;
            
            for (let i = 0; i < waveCount; i++) {
                this.waves.push({
                    amplitude: 20 + Math.random() * 30 * this.settings.waveHeight,
                    wavelength: 100 + Math.random() * 200,
                    speed: 0.5 + Math.random() * 1.0 * this.settings.waveSpeed,
                    offset: Math.random() * Math.PI * 2,
                    direction: Math.random() > 0.5 ? 1 : -1
                });
            }
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
            
            // Очищаем
            background.innerHTML = '';
            
            // Создаем canvas
            this.canvas = document.createElement('canvas');
            this.canvas.className = 'ocean-bg';
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: -1;
                pointer-events: none;
            `;
            
            background.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            
            this.resizeCanvas();
            this.initParticles();
            
            window.addEventListener('resize', () => {
                this.resizeCanvas();
                this.initParticles();
            });
            
            this.startAnimation();
        },
        
        resizeCanvas: function() {
            if (!this.canvas) return;
            
            const dpr = window.devicePixelRatio || 1;
            this.canvas.width = window.innerWidth * dpr;
            this.canvas.height = window.innerHeight * dpr;
            this.canvas.style.width = window.innerWidth + 'px';
            this.canvas.style.height = window.innerHeight + 'px';
            this.ctx.scale(dpr, dpr);
        },
        
        initParticles: function() {
            this.particles = [];
            const particleCount = this.settings.quality === 'high' ? 150 : 
                                this.settings.quality === 'medium' ? 80 : 30;
            
            for (let i = 0; i < particleCount; i++) {
                this.particles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight * this.settings.depth,
                    size: Math.random() * 2 + 0.5,
                    speed: Math.random() * 0.5 + 0.2,
                    opacity: Math.random() * 0.3 + 0.1,
                    type: Math.random() > 0.7 ? 'bubble' : 'sparkle'
                });
            }
        },
        
        startAnimation: function() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            
            const animate = () => {
                this.time += 0.016 * this.settings.waveSpeed;
                this.drawOcean();
                this.animationId = requestAnimationFrame(animate);
            };
            
            animate();
        },
        
        drawOcean: function() {
            if (!this.ctx || !this.canvas) return;
            
            const width = window.innerWidth;
            const height = window.innerHeight;
            const oceanHeight = height * this.settings.depth;
            
            // Очищаем canvas
            this.ctx.clearRect(0, 0, width, height);
            
            // Рисуем небо
            this.drawSky(width, height, oceanHeight);
            
            // Рисуем океан
            this.drawWater(width, oceanHeight);
            
            // Рисуем волны
            this.drawWaves(width, oceanHeight);
            
            // Рисуем пену
            this.drawFoam(width, oceanHeight);
            
            // Рисуем частицы
            this.drawParticles(width, height, oceanHeight);
            
            // Рисуем солнце/луну
            if (this.settings.sunEnabled) {
                this.drawSun(width, height);
            }
        },
        
        drawSky: function(width, height, oceanHeight) {
            // Градиент неба
            const skyGradient = this.ctx.createLinearGradient(0, 0, 0, oceanHeight);
            const skyColor = this.hexToRgb(this.settings.skyColor);
            const waterColor = this.hexToRgb(this.settings.waterColor);
            
            skyGradient.addColorStop(0, `rgb(${skyColor.r}, ${skyColor.g}, ${skyColor.b})`);
            skyGradient.addColorStop(1, `rgb(${waterColor.r}, ${waterColor.g}, ${waterColor.b})`);
            
            this.ctx.fillStyle = skyGradient;
            this.ctx.fillRect(0, 0, width, oceanHeight);
            
            // Облака (если высокое качество)
            if (this.settings.quality === 'high') {
                this.drawClouds(width, oceanHeight);
            }
        },
        
        drawWater: function(width, oceanHeight) {
            const waterGradient = this.ctx.createLinearGradient(0, oceanHeight, 0, window.innerHeight);
            const waterColor = this.hexToRgb(this.settings.waterColor);
            const deepWaterColor = this.darkenColor(waterColor, 0.7);
            
            waterGradient.addColorStop(0, `rgb(${waterColor.r}, ${waterColor.g}, ${waterColor.b})`);
            waterGradient.addColorStop(1, `rgb(${deepWaterColor.r}, ${deepWaterColor.g}, ${deepWaterColor.b})`);
            
            this.ctx.fillStyle = waterGradient;
            this.ctx.fillRect(0, oceanHeight, width, window.innerHeight - oceanHeight);
        },
        
        drawWaves: function(width, oceanHeight) {
            const wavePoints = [];
            const segmentCount = 100;
            
            // Генерируем точки волны
            for (let i = 0; i <= segmentCount; i++) {
                const x = (i / segmentCount) * width;
                let y = oceanHeight;
                
                // Суммируем все волны
                this.waves.forEach(wave => {
                    y += Math.sin((x / wave.wavelength + this.time * wave.speed + wave.offset)) * 
                         wave.amplitude * Math.sin(i / segmentCount * Math.PI);
                });
                
                wavePoints.push({x, y});
            }
            
            // Рисуем волну
            this.ctx.beginPath();
            this.ctx.moveTo(0, oceanHeight + 100); // Начинаем ниже экрана
            
            // Кривая волны
            wavePoints.forEach((point, i) => {
                if (i === 0) {
                    this.ctx.lineTo(point.x, point.y);
                } else {
                    const prevPoint = wavePoints[i - 1];
                    const cp1x = prevPoint.x + (point.x - prevPoint.x) / 3;
                    const cp1y = prevPoint.y;
                    const cp2x = prevPoint.x + (point.x - prevPoint.x) * 2 / 3;
                    const cp2y = point.y;
                    
                    this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, point.x, point.y);
                }
            });
            
            this.ctx.lineTo(width, oceanHeight + 100); // Заканчиваем ниже экрана
            this.ctx.closePath();
            
            // Заполняем волну
            const waveGradient = this.ctx.createLinearGradient(0, oceanHeight - 50, 0, oceanHeight + 50);
            const waterColor = this.hexToRgb(this.settings.waterColor);
            const lightWaterColor = this.lightenColor(waterColor, 0.3);
            
            waveGradient.addColorStop(0, `rgba(${lightWaterColor.r}, ${lightWaterColor.g}, ${lightWaterColor.b}, 0.7)`);
            waveGradient.addColorStop(1, `rgba(${waterColor.r}, ${waterColor.g}, ${waterColor.b}, 0.3)`);
            
            this.ctx.fillStyle = waveGradient;
            this.ctx.fill();
            
            // Контур волны
            this.ctx.strokeStyle = `rgba(${lightWaterColor.r}, ${lightWaterColor.g}, ${lightWaterColor.b}, 0.5)`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        },
        
        drawFoam: function(width, oceanHeight) {
            const foamColor = this.hexToRgb(this.settings.foamColor);
            
            // Рисуем пену на гребнях волн
            for (let i = 0; i < width; i += 20) {
                const foamHeight = Math.sin(i * 0.05 + this.time * 2) * 3 + 5;
                const foamWidth = 15 + Math.sin(i * 0.03 + this.time) * 5;
                
                this.ctx.beginPath();
                this.ctx.ellipse(
                    i + Math.sin(this.time + i * 0.01) * 10,
                    oceanHeight + Math.sin(i * 0.1 + this.time) * 10,
                    foamWidth,
                    foamHeight,
                    0, 0, Math.PI * 2
                );
                
                this.ctx.fillStyle = `rgba(${foamColor.r}, ${foamColor.g}, ${foamColor.b}, 0.3)`;
                this.ctx.fill();
            }
        },
        
        drawParticles: function(width, height, oceanHeight) {
            this.particles.forEach(particle => {
                // Обновляем позицию
                if (particle.type === 'bubble') {
                    particle.y -= particle.speed;
                    particle.x += Math.sin(this.time + particle.x) * 0.3;
                    
                    // Если пузырь ушел за верх, перемещаем вниз
                    if (particle.y < oceanHeight - 100) {
                        particle.y = oceanHeight + Math.random() * 100;
                        particle.x = Math.random() * width;
                    }
                } else {
                    // Сверкающие частицы
                    particle.x += Math.sin(this.time + particle.y) * 0.5;
                    particle.y += Math.cos(this.time + particle.x) * 0.5;
                    
                    // Ограничиваем область
                    if (particle.x < 0 || particle.x > width || particle.y < 0 || particle.y > oceanHeight) {
                        particle.x = Math.random() * width;
                        particle.y = Math.random() * oceanHeight;
                    }
                }
                
                // Рисуем частицу
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                if (particle.type === 'bubble') {
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                    this.ctx.strokeStyle = `rgba(200, 220, 255, ${particle.opacity * 0.5})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                } else {
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(this.time + particle.x) * 0.2 + 0.3})`;
                }
                
                this.ctx.fill();
            });
        },
        
        drawSun: function(width, height) {
            const sunX = width * 0.8;
            const sunY = height * 0.3;
            const sunRadius = 30;
            
            // Свечение
            const glow = this.ctx.createRadialGradient(
                sunX, sunY, sunRadius,
                sunX, sunY, sunRadius * 3
            );
            
            glow.addColorStop(0, 'rgba(255, 255, 200, 0.8)');
            glow.addColorStop(1, 'rgba(255, 255, 200, 0)');
            
            this.ctx.beginPath();
            this.ctx.arc(sunX, sunY, sunRadius * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = glow;
            this.ctx.fill();
            
            // Солнце
            this.ctx.beginPath();
            this.ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fill();
            
            // Отражение на воде
            this.drawSunReflection(width, height, sunX, sunY);
        },
        
        drawSunReflection: function(width, height, sunX, sunY) {
            const oceanHeight = height * this.settings.depth;
            const reflectionY = oceanHeight + (oceanHeight - sunY);
            
            this.ctx.save();
            this.ctx.globalAlpha = 0.3;
            
            const reflection = this.ctx.createLinearGradient(
                sunX, reflectionY - 50,
                sunX, reflectionY + 100
            );
            
            reflection.addColorStop(0, 'rgba(255, 255, 200, 0.5)');
            reflection.addColorStop(1, 'rgba(255, 255, 200, 0)');
            
            this.ctx.fillStyle = reflection;
            this.ctx.fillRect(sunX - 100, reflectionY - 50, 200, 150);
            
            this.ctx.restore();
        },
        
        drawClouds: function(width, oceanHeight) {
            for (let i = 0; i < 3; i++) {
                const cloudX = (this.time * 20 + i * 200) % (width + 400) - 200;
                const cloudY = oceanHeight * 0.3 + i * 30;
                const cloudSize = 40 + i * 20;
                
                this.ctx.save();
                this.ctx.globalAlpha = 0.1 + i * 0.05;
                
                this.ctx.beginPath();
                // Рисуем облако из нескольких кругов
                for (let j = 0; j < 5; j++) {
                    const circleX = cloudX + (j - 2) * 25;
                    const circleY = cloudY + Math.sin(j) * 10;
                    this.ctx.moveTo(circleX + 20, circleY);
                    this.ctx.arc(circleX, circleY, cloudSize * 0.8, 0, Math.PI * 2);
                }
                
                this.ctx.fillStyle = 'white';
                this.ctx.fill();
                this.ctx.restore();
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
        
        darkenColor: function(color, factor) {
            return {
                r: Math.floor(color.r * factor),
                g: Math.floor(color.g * factor),
                b: Math.floor(color.b * factor)
            };
        },
        
        lightenColor: function(color, factor) {
            return {
                r: Math.min(255, Math.floor(color.r * (1 + factor))),
                g: Math.min(255, Math.floor(color.g * (1 + factor))),
                b: Math.min(255, Math.floor(color.b * (1 + factor)))
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
        
        // Методы управления
        setWaveHeight: function(height) {
            this.settings.waveHeight = Math.max(0.1, Math.min(2.0, height));
            this.createWaves();
        },
        
        setWaveSpeed: function(speed) {
            this.settings.waveSpeed = Math.max(0.1, Math.min(1.0, speed));
        },
        
        setColors: function(water, foam, sky) {
            this.settings.waterColor = water;
            this.settings.foamColor = foam;
            this.settings.skyColor = sky;
        },
        
        setQuality: function(quality) {
            this.settings.quality = quality;
            this.createWaves();
            this.initParticles();
        }
    };
    
    // Инициализация
    function initOcean() {
        if (typeof Lampa === 'undefined') {
            setTimeout(initOcean, 1000);
            return;
        }
        
        // Задержка для полной загрузки
        setTimeout(() => {
            OceanBackground.init();
            
            // Экспортируем для доступа из консоли
            window.Ocean = OceanBackground;
            
            console.log('Ocean Background: Ready');
            console.log('Доступные команды:');
            console.log('Ocean.setWaveHeight(0.5) - высота волн');
            console.log('Ocean.setWaveSpeed(0.3) - скорость');
            console.log('Ocean.setColors("#0a192f", "#a8d0e6", "#1e3c72") - цвета');
            console.log('Ocean.setQuality("medium") - качество (low/medium/high)');
        }, 3000);
    }
    
    // Автоматический запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOcean);
    } else {
        initOcean();
    }
    
})();
