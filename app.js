
/* ============================================================
   🔥 SLIDER DINÁMICO + YOUTUBE IDS + LAZY LOADING
   ============================================================ */

const SLIDER_KEY = "kodigo73_slider_videos";
const sliderContainer = document.getElementById("dynamicSlider");
const sliderEditor = document.getElementById("sliderEditor");
const addVideoBtn = document.getElementById("addVideoBtn");

let sliderVideos = [];

/* ============================================================
   📌 Convertir ID → URL embed
   ============================================================ */
function yt(id) {
  return `https://www.youtube.com/embed/${id}`;
}

/* ============================================================
   📌 Lazy Loading de iframes
   ============================================================ */
function createLazyIframe(url) {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute("allowfullscreen", "");
  iframe.src = url;
  return iframe;
}

/* ============================================================
   📌 Cargar vídeos guardados
   ============================================================ */
function loadSliderVideos() {
  const raw = localStorage.getItem(SLIDER_KEY);

  sliderVideos = raw
    ? JSON.parse(raw)
    : ["dQw4w9WgXcQ"]; // Solo IDs, no URLs

  renderSlider();
  renderEditor();
}

/* ============================================================
   📌 Guardar vídeos
   ============================================================ */
function saveSliderVideos() {
  localStorage.setItem(SLIDER_KEY, JSON.stringify(sliderVideos));
  renderSlider();
  renderEditor();
}

/* ============================================================
   📌 Renderizar slider
   ============================================================ */
function renderSlider() {
  sliderContainer.innerHTML = "";

  sliderVideos.forEach(id => {
    const card = document.createElement("div");
    card.className = "video-card";

    const iframe = createLazyIframe(yt(id));
    card.appendChild(iframe);

    sliderContainer.appendChild(card);
  });
}

/* ============================================================
   📌 Editor Admin
   ============================================================ */
function renderEditor() {
  sliderEditor.innerHTML = "";

  sliderVideos.forEach((id, index) => {
    const row = document.createElement("div");
    row.style.marginBottom = "10px";

    row.innerHTML = `
      <input type="text" value="${id}" data-index="${index}" class="slider-input" style="width:80%">
      <button data-del="${index}" class="btn-danger">Eliminar</button>
    `;

    sliderEditor.appendChild(row);
  });

  // Editar ID
  document.querySelectorAll(".slider-input").forEach(input => {
    input.addEventListener("input", () => {
      const i = input.dataset.index;
      sliderVideos[i] = input.value.trim();
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

/* ============================================================
   📌 Añadir vídeo (solo ID)
   ============================================================ */
addVideoBtn.addEventListener("click", () => {
  const id = prompt("Introduce el ID del vídeo de YouTube:");
  if (id && id.length > 5) {
    sliderVideos.push(id.trim());
    saveSliderVideos();
  }
});

/* ============================================================
   📌 Inicializar
   ============================================================ */
loadSliderVideos();
