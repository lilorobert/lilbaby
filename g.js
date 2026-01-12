(function() {
    'use strict';

    const SimpleOcean = {
        name: 'Simple Ocean CSS',
        version: '1.0.0',
        
        init: function() {
            const style = document.createElement('style');
            style.textContent = `
                .simple-ocean-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: -1;
                    pointer-events: none;
                    overflow: hidden;
                }
                
                .ocean-sky {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 60%;
                    background: linear-gradient(to bottom, #1e3c72 0%, #2a5298 100%);
                }
                
                .ocean-water {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 40%;
                    background: linear-gradient(to bottom, #0a192f 0%, #1a3a5f 100%);
                }
                
                .wave {
                    position: absolute;
                    bottom: 40%;
                    left: 0;
                    width: 200%;
                    height: 50px;
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M0,50 Q300,30 600,50 T1200,50 L1200,100 L0,100 Z" fill="%23a8d0e6" opacity="0.3"/></svg>') repeat-x;
                    animation: wave-animation 20s linear infinite;
                }
                
                .wave:nth-child(2) {
                    bottom: 39%;
                    opacity: 0.5;
                    animation-duration: 25s;
                    animation-direction: reverse;
                }
                
                .wave:nth-child(3) {
                    bottom: 38%;
                    opacity: 0.3;
                    animation-duration: 30s;
                }
                
                .bubble {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    animation: bubble-rise 15s infinite ease-in;
                }
                
                @keyframes wave-animation {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                @keyframes bubble-rise {
                    0% {
                        transform: translateY(0) scale(0.5);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.3;
                    }
                    90% {
                        opacity: 0.1;
                    }
                    100% {
                        transform: translateY(-100px) scale(1.5);
                        opacity: 0;
                    }
                }
            `;
            
            document.head.appendChild(style);
            
            setTimeout(() => this.createOcean(), 2000);
        },
        
        createOcean: function() {
            const background = document.querySelector('.background');
            if (!background) return;
            
            if (!background.dataset.originalContent) {
                background.dataset.originalContent = background.innerHTML;
            }
            
            const ocean = document.createElement('div');
            ocean.className = 'simple-ocean-bg';
            
            ocean.innerHTML = `
                <div class="ocean-sky"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="ocean-water"></div>
            `;
            
            background.innerHTML = '';
            background.appendChild(ocean);
            
            // Добавляем пузыри
            this.addBubbles(ocean);
        },
        
        addBubbles: function(container) {
            for (let i = 0; i < 20; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                
                const size = Math.random() * 10 + 5;
                const left = Math.random() * 100;
                const delay = Math.random() * 15;
                const duration = 10 + Math.random() * 20;
                
                bubble.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${left}%;
                    bottom: 40%;
                    animation-delay: ${delay}s;
                    animation-duration: ${duration}s;
                `;
                
                container.appendChild(bubble);
            }
        }
    };
    
    // Запуск
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof Lampa !== 'undefined') {
            SimpleOcean.init();
        }
    });
})();
