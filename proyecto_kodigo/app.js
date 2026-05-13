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
   CONTENIDO EDITABLE + LOCALSTORAGE (BUILDER)
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

// Cargar contenido guardado al iniciar
loadContent();

/* ============================================================
   FORMULARIO DE CONTACTO (DEMO)
   ============================================================ */

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Señal enviada (demo). Aquí podrías conectar un backend real.");
  });
}

/* ============================================================
   SLIDER TIPO NETFLIX
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
