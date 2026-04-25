// Navegación entre páginas
function navigateTo(page) {
    if (window.location.pathname.includes('/pages/')) {
        window.location.href = `${page}.html`;
    } else {
        window.location.href = `pages/${page}.html`;
    }
}

// Detectar click/tap universal
document.addEventListener('DOMContentLoaded', function() {
    // Soporte para click y touch
    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleClick, { passive: true });
});

function handleClick(e) {
    // Prevenir eventos dobles en mobile
    if (e.type === 'touchstart') {
        e.preventDefault();
    }
}

// Botón Final → pages/final.html
document.getElementById('goFinal').addEventListener('click', () => {
    navigateTo('final');
});

// Botón Volver (opcional)
document.addEventListener('DOMContentLoaded', () => {
    const backHomeBtn = document.getElementById('backHome');

    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', () => {
            navigateTo('home');
        });
    }
});