let introStep = 1;
let isAnimating=false;
const texts = ['hola','bienvenida'];
const introText = document.getElementById('introText');
const inputContainer = document.getElementById('inputContainer');

document.querySelector('.intro-container')
.addEventListener('click', handleIntroClick);

function handleIntroClick() {
    if(isAnimating)return;

    if(introStep < texts.length){
        isAnimating=true;
        animateTextChange(texts[introStep]);
        introStep++;
    }else if(introStep==texts.length){
        showInput();
        introStep++;
    }
}

function animateTextChange(newText) {
    gsap.to(introText, {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        y: -20,
        ease: "power2.inOut",
        onComplete: () => {
            introText.textContent = newText;

            gsap.fromTo(introText, 
                { scale: 0.8, opacity: 0, y: 20 },
                { 
                    scale: 1, 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    ease: "power2.out",
                    onComplete: () => {
                        isAnimating = false; 
                    }
                }
            );
        }
    });
}

function showInput() {
    inputContainer.style.visibility="visible";

    gsap.fromTo(inputContainer, 
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
}