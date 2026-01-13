/**
 * Evening Static Background Plugin for Lampa
 * Красивый вечерний статичный фон без Vanta / WebGL
 */

(function () {
    'use strict';

    function initPlugin() {
        if (typeof Lampa === 'undefined') {
            setTimeout(initPlugin, 500);
            return;
        }

        const EveningBackground = {
            name: 'Evening Static Background',
            version: '1.0.0',
            author: 'Custom',
            description: 'Вечерний кинофон без анимации',

            canvas: null,

            init() {
                this.applyBackground();
                this.bindEvents();
                console.log('Evening Background: initialized');
            },

            applyBackground() {
                const background = document.querySelector('.background');
                if (!background) return;

                // сохраняем оригинал
                if (!background.dataset.originalContent) {
                    background.dataset.originalContent = background.innerHTML;
                }

                background.innerHTML = '';
                background.style.position = 'fixed';
                background.style.top = '0';
                background.style.left = '0';
                background.style.width = '100%';
                background.style.height = '100%';
                background.style.zIndex = '-1';
                background.style.pointerEvents = 'none';
                background.style.background = '#05060F';

                const canvas = document.createElement('canvas');
                this.canvas = canvas;

                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                canvas.style.width = '100%';
                canvas.style.height = '100%';

                background.appendChild(canvas);

                this.drawEvening(canvas);
            },

            drawEvening(canvas) {
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const w = canvas.width;
                const h = canvas.height;

                // === ОСНОВНОЙ ВЕЧЕРНИЙ ГРАДИЕНТ ===
                const base = ctx.createLinearGradient(0, 0, 0, h);
                base.addColorStop(0, '#0B1020'); // верх
                base.addColorStop(0.6, '#05060F'); // середина
                base.addColorStop(1, '#02030A'); // низ

                ctx.fillStyle = base;
                ctx.fillRect(0, 0, w, h);

                // === МЯГКОЕ СВЕЧЕНИЕ В ЦЕНТРЕ ===
                const glow = ctx.createRadialGradient(
                    w / 2,
                    h * 0.45,
                    0,
                    w / 2,
                    h * 0.45,
                    Math.max(w, h) * 0.6
                );

                glow.addColorStop(0, 'rgba(120, 140, 255, 0.10)');
                glow.addColorStop(0.4, 'rgba(80, 90, 180, 0.06)');
                glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = glow;
                ctx.fillRect(0, 0, w, h);

                // === ВИНЬЕТКА (ТЁМНЫЕ КРАЯ) ===
                const vignette = ctx.createRadialGradient(
                    w / 2,
                    h / 2,
                    Math.min(w, h) * 0.2,
                    w / 2,
                    h / 2,
                    Math.max(w, h) * 0.7
                );

                vignette.addColorStop(0, 'rgba(0,0,0,0)');
                vignette.addColorStop(1, 'rgba(0,0,0,0.45)');

                ctx.fillStyle = vignette;
                ctx.fillRect(0, 0, w, h);
            },

            handleResize() {
                if (!this.canvas) return;
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.drawEvening(this.canvas);
            },

            bindEvents() {
                this.resizeHandler = () => this.handleResize();
                window.addEventListener('resize', this.resizeHandler);
            },

            destroy() {
                const background = document.querySelector('.background');
                if (background && background.dataset.originalContent) {
                    background.innerHTML = background.dataset.originalContent;
                    background.style.cssText = '';
                }

                if (this.resizeHandler) {
                    window.removeEventListener('resize', this.resizeHandler);
                }

                console.log('Evening Background: destroyed');
            }
        };

        // запуск
        setTimeout(() => EveningBackground.init(), 1500);
        window.EveningBackground = EveningBackground;
    }

    initPlugin();
})();
