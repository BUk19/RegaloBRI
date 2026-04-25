class AudioManager {
  constructor() {
    this.currentAudio = null;
    this.audioElements = {};
    this.overlay = null;
    this.init();
  }

  init() {
    // 🔥 cargar audios
    this.loadAudio("audio1");
    this.loadAudio("audio2");
    this.loadAudio("audio3");
    this.loadAudio("audio4");
    this.loadAudio("audio5");
    this.loadAudio("final");

    this.overlay = document.getElementById("audioOverlay");

    // 🔥 click en overlay (cerrar)
    this.overlay.addEventListener("click", () => {
      this.closeAudio();
    });

    // 🔥 clicks generales
    document.addEventListener("click", (e) => this.handleAudioClick(e));
  }

  loadAudio(id) {
    const audio = new Audio(`../assets/audio/${id}.mp3`);
    audio.preload = "auto";
    this.audioElements[id] = audio;
  }

  handleAudioClick(e) {
    const panel = e.target.closest(".audio-panel");
    const finalBtn = e.target.closest("#finalAudio");

    if (panel) {
      const audioId = `audio${panel.dataset.audio}`;
      this.playAudio(audioId, panel);
    } else if (finalBtn) {
      this.playAudio("final", finalBtn);
    }
  }

  playAudio(id, element) {
    const audio = this.audioElements[id];

    if (!audio) return;

    // Detener audio actual
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    // Crear POP-UP NUEVO (MISMA IMAGEN)
    let imgSrc = null;

    const img = element.querySelector(".panel-img");
    if (img) {
      imgSrc = img.src;
    }

    this.createPopup(id, imgSrc);

    // Activar overlay
    this.overlay.classList.add("active");
    document.body.classList.add("audio-active");

    // Reproducir audio
    audio.play().catch((e) => console.log(e));
    this.currentAudio = audio;
  }

  closeAudio() {
    // Quitar focus
    document.querySelectorAll(".audio-panel").forEach((p) => {
      p.classList.remove("focused");
    });

    // ELIMINAR POP-UP
    const popup = document.querySelector(".audio-popup");
    if (popup) popup.remove();

    // Quitar blur
    this.overlay.classList.remove("active");
    document.body.classList.remove("audio-active");

    // Detener audio
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentTime = 0;
    }
  }

  createPopup(audioId, imgSrc) {
    // Eliminar popup anterior
    const oldPopup = document.querySelector(".audio-popup");
    if (oldPopup) oldPopup.remove();

    // Crear NUEVO POP-UP
    const popup = document.createElement("div");
    popup.className = "audio-popup";
    popup.innerHTML = `
    ${imgSrc ? `<img src="${imgSrc}" class="popup-img">` : ""}
    <div class="popup-label">Mensaje ${audioId === "final" ? "final" : audioId.replace("audio", "")}</div>
`;

    document.body.appendChild(popup);
  } // ← ESTA LLAVE CIERRA LA FUNCIÓN
}

// 🔥 iniciar
document.addEventListener("DOMContentLoaded", () => {
  window.audioManager = new AudioManager();
});
