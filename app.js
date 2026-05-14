/* ============================================================
   🔥 SLIDER DINÁMICO COMPATIBLE (IDs + URLs) + LAZY LOADING
   ============================================================ */

const SLIDER_KEY = "kodigo73_slider_videos";
const sliderContainer = document.getElementById("dynamicSlider");
const sliderEditor = document.getElementById("sliderEditor");
const addVideoBtn = document.getElementById("addVideoBtn");

let sliderVideos = [];

/* ============================================================
   📌 Normalizar entrada: ID o URL → URL embed limpia
   ============================================================ */
function toEmbedUrl(value) {
  if (!value) return "";

  const v = value.trim();

  // Si ya es una URL embed válida, la devolvemos tal cual
  if (v.startsWith("http")) {
    // Si es una URL normal de YouTube, intentamos sacar el ID
    try {
      const url = new URL(v);
      if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
        // youtu.be/ID
        if (url.hostname === "youtu.be") {
          return `https://www.youtube.com/embed/${url.pathname.replace("/", "")}`;
        }
        // youtube.com/watch?v=ID
        const id = url.searchParams.get("v");
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
    } catch (e) {
      // Si falla el parseo, devolvemos lo que venga
      return v;
    }

    // Si ya es un embed o algo raro pero válido, lo dejamos
    return v;
  }

  // Si no empieza por http, asumimos que es un ID
  return `https://www.youtube.com/embed/${v}`;
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
    : [
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      ]; // compatible con tu formato antiguo

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

  sliderVideos.forEach(value => {
    const card = document.createElement("div");
    card.className = "video-card";

    const embedUrl = toEmbedUrl(value);
    const iframe = createLazyIframe(embedUrl);
    card.appendChild(iframe);

    sliderContainer.appendChild(card);
  });
}

/* ============================================================
   📌 Editor Admin
   ============================================================ */
function renderEditor() {
  sliderEditor.innerHTML = "";

  sliderVideos.forEach((value, index) => {
    const row = document.createElement("div");
    row.style.marginBottom = "10px";

    row.innerHTML = `
      <input type="text" value="${value}" data-index="${index}" class="slider-input" style="width:80%">
      <button data-del="${index}" class="btn-danger">Eliminar</button>
    `;

    sliderEditor.appendChild(row);
  });

  // Editar valor (ID o URL)
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
   📌 Añadir vídeo (acepta ID o URL)
   ============================================================ */
addVideoBtn.addEventListener("click", () => {
  const value = prompt("Introduce el ID o la URL del vídeo de YouTube:");
  if (value && value.trim().length > 3) {
    sliderVideos.push(value.trim());
    saveSliderVideos();
  }
});

/* ============================================================
   📌 Inicializar
   ============================================================ */
loadSliderVideos();
