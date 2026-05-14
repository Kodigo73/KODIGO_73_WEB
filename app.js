
/* ============================================================
   CONFIGURACIÓN GENERAL
   ============================================================ */

const ADMIN_PASSWORD = "kodigo73_master";

/* ============================================================
   SISTEMA DE PESTAÑAS
   ============================================================ */

const tabs = document.querySelectorAll(".nav-tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab");

    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    tabContents.forEach((section) => {
      section.classList.toggle("active", section.id === target);
    });
  });
});

/* ============================================================
   PANEL ADMIN / BUILDER
   ============================================================ */

const adminTrigger = document.getElementById("adminTrigger");
const adminPanel = document.getElementById("adminPanel");
const exitAdminBtn = document.getElementById("exitAdmin");
const resetContentBtn = document.getElementById("resetContent");

let isAdmin = false;

function enterAdminMode() {
  document.body.classList.add("admin-mode");
  adminPanel.classList.remove("hidden");
  isAdmin = true;
  enableEditable();
}

function exitAdminMode() {
  document.body.classList.remove("admin-mode");
  adminPanel.classList.add("hidden");
  isAdmin = false;
  disableEditable();
}

adminTrigger.addEventListener("click", () => {
  if (isAdmin) {
    exitAdminMode();
    return;
  }

  const pass = prompt("Introduce la clave maestra de KODIGO_73:");
  if (pass === ADMIN_PASSWORD) {
    enterAdminMode();
  } else if (pass !== null) {
    alert("Clave incorrecta. Acceso denegado.");
  }
});

exitAdminBtn.addEventListener("click", () => {
  exitAdminMode();
});

/* ============================================================
   CONTENIDO EDITABLE + LOCALSTORAGE
   ============================================================ */

const editableElements = document.querySelectorAll(".editable");
const STORAGE_KEY = "kodigo73_content";

function loadContent() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    editableElements.forEach((el) => {
      const key = el.dataset.key;
      if (key && data[key] !== undefined) {
        el.innerText = data[key];
      }
    });
  } catch (e) {
    console.warn("No se pudo cargar el contenido guardado:", e);
  }
}

function saveContent() {
  const data = {};
  editableElements.forEach((el) => {
    const key = el.dataset.key;
    if (key) {
      data[key] = el.innerText;
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function enableEditable() {
  editableElements.forEach((el) => {
    el.setAttribute("contenteditable", "true");
    el.addEventListener("input", saveContent);
  });
}

function disableEditable() {
  editableElements.forEach((el) => {
    el.removeAttribute("contenteditable");
    el.removeEventListener("input", saveContent);
  });
}

resetContentBtn.addEventListener("click", () => {
  if (confirm("¿Seguro que quieres resetear todo el contenido editable?")) {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
});

// Cargar contenido guardado
loadContent();

/* ============================================================
   FORMULARIO DE CONTACTO
   ============================================================ */

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Señal enviada (demo). Aquí podrías conectar un backend real.");
  });
}

/* ============================================================
   SLIDER TIPO NETFLIX (BOTONES)
   ============================================================ */

const slider = document.querySelector(".video-slider");
const btnLeft = document.querySelector(".left-btn");
const btnRight = document.querySelector(".right-btn");

if (slider && btnLeft && btnRight) {
  btnLeft.addEventListener("click", () => {
    slider.scrollBy({ left: -350, behavior: "smooth" });
  });

  btnRight.addEventListener("click", () => {
    slider.scrollBy({ left: 350, behavior: "smooth" });
  });
}

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
  sliderVideos = raw ? JSON.parse(raw) : [
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

/* ============================================================
   🔥 SLIDER DINÁMICO EDITABLE (MEJORADO CON AUTO-CONVERSIÓN)
   ============================================================ */

const SLIDER_KEY = "kodigo73_slider_videos";
const sliderContainer = document.getElementById("dynamicSlider");
const sliderEditor = document.getElementById("sliderEditor");
const addVideoBtn = document.getElementById("addVideoBtn");

let sliderVideos = [];

/* -------------------------------------------
   Convertir cualquier URL de YouTube a EMBED
-------------------------------------------- */
function toEmbed(url) {
  try {
    // Caso 1: formato normal ?v=
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Caso 2: formato corto youtu.be
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Caso 3: ya es embed
    if (url.includes("/embed/")) {
      return url;
    }

    // Caso 4: fallback
    return url;
  } catch {
    return url;
  }
}

/* -------------------------------------------
   Cargar vídeos guardados
-------------------------------------------- */
function loadSliderVideos() {
  const raw = localStorage.getItem(SLIDER_KEY);
  sliderVideos = raw ? JSON.parse(raw) : [];
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
  sliderContainer.innerHTML = "";
  sliderVideos.forEach(url => {
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
      sliderVideos[i] = toEmbed(input.value);
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

/* -------------------------------------------
   Añadir vídeo
-------------------------------------------- */
addVideoBtn.addEventListener("click", () => {
  const url = prompt("Pega la URL del vídeo (cualquier formato de YouTube):");
  if (url) {
    sliderVideos.push(toEmbed(url));
    saveSliderVideos();
  }
});

/* -------------------------------------------
   Inicializar
-------------------------------------------- */
loadSliderVideos();
