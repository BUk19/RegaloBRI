const nameInput = document.getElementById('nameInput');
const errorMessage = document.getElementById('errorMessage');

if(nameInput){
nameInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        validateName();
    }
});
}

//nameInput.addEventListener('blur', validateName);

function validateName() {
    const name = nameInput.value.trim().toLowerCase();
    const validNames = ['brisa'];
    
    if (validNames.includes(name)) {
        // Éxito - ir a home
        gsap.to('body', {
            duration: 1,
            opacity: 0,
            scale: 0.95,
            ease: "power2.inOut",
            onComplete: () => {
                navigateTo('home');
            }
        });
    } else {
        // Error
        showError();
    }
}

function showError() {
    errorMessage.textContent = 'no eres tú 👀';
    gsap.to(errorMessage, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
    });
    
    // Shake animation
    gsap.to(nameInput, {
        x: -10,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut"
    });
    
    nameInput.value = '';
    nameInput.focus();
    
    setTimeout(() => {
        gsap.to(errorMessage, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            ease: "power2.in"
        });
    }, 2000);
}