
/* ============================================================
   🔥 SLIDER DINÁMICO EDITABLE
   ============================================================ */

const SLIDER_KEY = "kodigo73_slider_videos";
const sliderContainer = document.getElementById("dynamicSlider");
const sliderEditor = document.getElementById("sliderEditor");
const addVideoBtn = document.getElementById("addVideoBtn");

let sliderVideos = [];

// Cargar vídeos guardados
function loadSliderVideos() {
  const raw = localStorage.getItem(SLIDER_KEY);
  sliderVideos = raw
    ? JSON.parse(raw)
    : [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ];
  renderSlider();
  renderEditor();
}

// Guardar vídeos
function saveSliderVideos() {
  localStorage.setItem(SLIDER_KEY, JSON.stringify(sliderVideos));
  renderSlider();
  renderEditor();
}

// Renderizar slider
function renderSlider() {
  sliderContainer.innerHTML = "";
  sliderVideos.forEach(url => {
    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `<iframe src="${url}" allowfullscreen></iframe>`;
    sliderContainer.appendChild(card);
  });
}

// Renderizar editor admin
function renderEditor() {
  sliderEditor.innerHTML = "";

  sliderVideos.forEach((url, index) => {
    const row = document.createElement("div");
    row.style.marginBottom = "10px";

    row.innerHTML = `
      <input type="text" value="${url}" data-index="${index}" class="slider-input" style="width:80%">
      <button data-del="${index}" class="btn-danger">Eliminar</button>
    `;

    sliderEditor.appendChild(row);
  });

  // Editar URL
  document.querySelectorAll(".slider-input").forEach(input => {
    input.addEventListener("input", () => {
      const i = input.dataset.index;
      sliderVideos[i] = input.value;
      saveSliderVideos();
    });
  });

  // Eliminar vídeo
  document.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.dataset.del;
      sliderVideos.splice(i, 1);
      saveSliderVideos();
    });
  });
}

// Añadir vídeo
addVideoBtn.addEventListener("click", () => {
  const url = prompt("Introduce la URL del vídeo (YouTube embed):");
  if (url) {
    sliderVideos.push(url);
    saveSliderVideos();
  }
});

// Inicializar
loadSliderVideos();
