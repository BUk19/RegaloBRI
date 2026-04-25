// Inicialización global de animaciones
document.addEventListener('DOMContentLoaded', initPageAnimations);

function initPageAnimations() {
    // Animación de entrada general
    gsap.from('body', {
        duration: 1.5,
        opacity: 0,
        scale: 0.8,
        ease: "back.out(1.7)"
    });
    
    // Detectar página actual y ejecutar animaciones específicas
    if (document.querySelector('.intro-container')) {
        initIntroAnimations();
    } else if (document.querySelector('.home-container')) {
        initHomeAnimations();
    } else if (document.querySelector('.final-container')) {
        initFinalAnimations();
    }
    
    // Botones de navegación
    setupNavigationButtons();
    
    // Estrellas continuas en home
    if (document.querySelector('.stars-bg')) {
        animateStars();
    }
}

function initIntroAnimations() {
    // Partículas flotantes en intro
    createFloatingParticles();
}

function initHomeAnimations() {
    const japaneseText = document.getElementById('japaneseText');
    
    // 🔥 separar letras
    const text = japaneseText.textContent;
    japaneseText.innerHTML = text
        .split('')
        .map(letter => `<span class="letter">${letter}</span>`)
        .join('');
    
    const letters = document.querySelectorAll('.letter');

    // ✨ animación letra por letra (entrada)
    gsap.from(letters, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)"
    });

    // 💜 glow suave continuo
    gsap.to(letters, {
        textShadow: "0 0 20px #d4a8ff, 0 0 40px #9b5cff",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        stagger: 0.2
    });

    // 🌠 estrellas fugaces
    setInterval(createShootingStar, 3000);
}

function initFinalAnimations() {
    // Texto final con brillo
    const finalText = document.querySelector('.final-text');
    gsap.to(finalText, {
        textShadow: '0 0 60px #d4a8ff, 0 0 80px #ff6b9d',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
    });

    const finalAudioBtn = document.getElementById('finalAudio');

if (finalAudioBtn) {
    finalAudioBtn.addEventListener('click', () => {
        explodeConfetti();

        // 💥 efecto al texto
        gsap.fromTo('.final-text',
            { scale: 1 },
            { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" }
        );

        // 🌌 fondo más vivo
        gsap.to('.final-container', {
            background: 'radial-gradient(ellipse at center, #2a0a4e 0%, #000 70%)',
            duration: 1
        });
    });
}
}

function setupNavigationButtons() {
    // Botón ir a final
    const goFinalBtn = document.getElementById('goFinal');
    if (goFinalBtn) {
        goFinalBtn.addEventListener('click', (e) => {
            gsap.to(e.target, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            setTimeout(() => navigateTo('final'), 200);
        });
    }
    
    // Botón volver al inicio
    const backHomeBtn = document.getElementById('backHome');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', (e) => {
            gsap.to(e.target, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            setTimeout(() => navigateTo('home'), 200);
        });
    }
}

function animateStars() {
    gsap.to('.stars-bg', {
        backgroundPosition: '100px 100px',
        duration: 20,
        repeat: -1,
        ease: "none"
    });
}

function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        box-shadow: 0 0 10px white;
        top: ${Math.random() * 20 + 10}%;
        left: -10px;
        animation: shoot ${Math.random() * 2 + 1.5}s linear forwards;
    `;
    document.querySelector('.home-container').appendChild(star);
    
    setTimeout(() => star.remove(), 4000);
}

// Partículas flotantes para intro
function createFloatingParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(224, 160, 255, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
        `;
        document.querySelector('.intro-container').appendChild(particle);
    }
}

// Estilos CSS para animaciones (se inyectan dinámicamente)
const style = document.createElement('style');
style.textContent = `
    @keyframes shoot {
        to { transform: translateX(100vw) translateY(100px) rotate(720deg); opacity: 0; }
    }
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
    }
    .shooting-star {
        animation-fill-mode: forwards;
    }
`;
document.head.appendChild(style);

function explodeConfetti() {
    const container = document.querySelector('.confetti-container');

    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = getRandomColor();

        container.appendChild(confetti);

        gsap.to(confetti, {
            y: window.innerHeight + 100,
            x: `+=${Math.random() * 200 - 100}`,
            rotation: Math.random() * 720,
            duration: Math.random() * 2 + 2,
            ease: "power2.out",
            onComplete: () => confetti.remove()
        });
    }
}

function getRandomColor() {
    const colors = ['#ff6b9d', '#d4a8ff', '#ffffff', '#9b5cff'];
    return colors[Math.floor(Math.random() * colors.length)];
}