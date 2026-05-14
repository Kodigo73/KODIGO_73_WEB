/* ============================================================
   🔥 SLIDER DINÁMICO EDITABLE (VERSIÓN ROBUSTA)
   ============================================================ */

const SLIDER_KEY = "kodigo73_slider_videos";
const sliderContainer = document.getElementById("dynamicSlider");
const sliderEditor = document.getElementById("sliderEditor");
const addVideoBtn = document.getElementById("addVideoBtn");

let sliderVideos = [];

/* -------------------------------------------
   Normalizar y convertir cualquier URL a EMBED
-------------------------------------------- */
function toEmbed(rawUrl) {
  if (!rawUrl) return "";

  let url = rawUrl.trim();

  // Si no empieza por http, le añadimos https://
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  try {
    const u = new URL(url);

    // YouTube normal: https://www.youtube.com/watch?v=ID
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      const id = u.searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }

    // YouTube corto: https://youtu.be/ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    // Ya es embed de YouTube
    if (u.hostname.includes("youtube.com") && u.pathname.includes("/embed/")) {
      return url;
    }

    // Cualquier otra cosa: devolvemos la URL tal cual
    return url;
  } catch (e) {
    // Si falla el parseo, devolvemos lo que haya
    return url;
  }
}

/* -------------------------------------------
   Cargar vídeos guardados
-------------------------------------------- */
function loadSliderVideos() {
  const raw = localStorage.getItem(SLIDER_KEY);

  if (raw) {
    sliderVideos = JSON.parse(raw);
  } else {
    // 🔥 Vídeo de prueba por defecto para comprobar que funciona
    sliderVideos = [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ];
  }

  renderSlider();
  renderEditor();
}

/* -------------------------------------------
   Guardar vídeos
-------------------------------------------- */
function saveSliderVideos() {
  localStorage.setItem(SLIDER_KEY, JSON.stringify(sliderVideos));
  renderSlider();
  renderEditor();
}

/* -------------------------------------------
   Renderizar slider
-------------------------------------------- */
function renderSlider() {
  if (!sliderContainer) return;

  sliderContainer.innerHTML = "";

  sliderVideos.forEach((url) => {
    const embed = toEmbed(url);

    const card = document.createElement("div");
    card.className = "video-card";
    card.innerHTML = `<iframe src="${embed}" allowfullscreen></iframe>`;

    sliderContainer.appendChild(card);
  });
}

/* -------------------------------------------
   Renderizar editor admin
-------------------------------------------- */
function renderEditor() {
  if (!sliderEditor) return;

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
  document.querySelectorAll(".slider-input").forEach((input) => {
    input.addEventListener("input", () => {
      const i = input.dataset.index;
      sliderVideos[i] = input.value;
      saveSliderVideos();
    });
  });

  // Eliminar vídeo
  document.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = btn.dataset.del;
      sliderVideos.splice(i, 1);
      saveSliderVideos();
    });
  });
}

/* -------------------------------------------
   Añadir vídeo
-------------------------------------------- */
if (addVideoBtn) {
  addVideoBtn.addEventListener("click", () => {
    const url = prompt("Pega la URL del vídeo (YouTube normal, corto o embed):");
    if (url) {
      sliderVideos.push(url.trim());
      saveSliderVideos();
    }
  });
}

/* -------------------------------------------
   Inicializar
-------------------------------------------- */
loadSliderVideos();
