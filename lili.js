// 1. Animation au défilement (Scroll Reveal)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// 2. Fonction Pluie de Coeurs (La Masterclass)
function createHearts(event) {
  const icon = "❤️"; // On garde uniquement le cœur
  const heartCount = 15; // Nombre de cœurs par clic

  for (let i = 0; i < heartCount; i++) {
    const effect = document.createElement("div");
    effect.className = "heart";
    effect.innerHTML = icon;

    // Position de départ exacte au clic
    effect.style.left = event.clientX + "px";
    effect.style.top = event.clientY + "px";

    // Variations aléatoires pour le mouvement
    const translateX = (Math.random() - 0.5) * 200; // Écartement horizontal
    const translateY = -(Math.random() * 200 + 100); // Envol vers le haut
    const duration = Math.random() * 1.5 + 1.5; // Durée entre 1.5s et 3s

    effect.style.setProperty("--tx", `${translateX}px`);
    effect.style.setProperty("--ty", `${translateY}px`);
    effect.style.fontSize = Math.random() * 20 + 15 + "px";
    effect.style.animation = `heart-fly ${duration}s ease-out forwards`;

    document.body.appendChild(effect);

    setTimeout(() => {
      effect.remove();
    }, duration * 1000);
  }
}
function updateTimer() {
  // Date de début : 23 Novembre 2025 (Mois est 0-indexé, donc 10 = Novembre)
  const startDate = new Date(2025, 10, 23);
  const now = new Date();

  const diffInMs = now - startDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const timerElement = document.getElementById("timer");
  if (timerElement) {
    timerElement.innerText = `❤️ Ensemble depuis ${diffInDays} jours ❤️`;
  }
}

// Mettre à jour immédiatement et toutes les 24h
updateTimer();
setInterval(updateTimer, 86400000);

// Effet d'inclinaison 3D (Tilt effect) sur les cartes
const cards = document.querySelectorAll(".friend-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const cardRect = card.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;

    // Calcul du centre de la carte
    const centerX = cardRect.left + cardWidth / 2;
    const centerY = cardRect.top + cardHeight / 2;

    // Position de la souris par rapport au centre
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Inclinaison (max 10 degrés)
    const rotateX = ((+10 * mouseY) / (cardHeight / 2)).toFixed(2);
    const rotateY = ((-10 * mouseX) / (cardWidth / 2)).toFixed(2);

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  // Reset au départ de la souris
  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// Petit bonus : Effet d'apparition au scroll pour le groupe
const observerSquad = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.filter = "grayscale(0%)";
      }
    });
  },
  { threshold: 0.5 }
);

document
  .querySelectorAll(".squad-img")
  .forEach((img) => observerSquad.observe(img));

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const yearDisplay = document.getElementById("year-display");

function changeSlide(direction) {
  // Retirer la classe active actuelle
  slides[currentSlide].classList.remove("active");

  // Calculer le nouvel index
  currentSlide = (currentSlide + direction + slides.length) % slides.length;

  // Ajouter la classe active au nouveau slide
  slides[currentSlide].classList.add("active");

  // Mettre à jour l'année avec un petit effet
  const nextYear = slides[currentSlide].getAttribute("data-year");
  yearDisplay.style.opacity = "0";

  setTimeout(() => {
    yearDisplay.innerText = nextYear;
    yearDisplay.style.opacity = "1";
  }, 300);
  console.log("Slide actuelle :", currentSlide, "Année :", nextYear);
}

// 1. Horloge en temps réel
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("time").innerText = timeString;
}
setInterval(updateTime, 1000);

// 2. Retour en haut fluide
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// 3. Surprise : Explosion de cœurs !
function fireSurprise() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#ffb7c5", "#ff4d6d"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ffb7c5", "#ff4d6d"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Barre de progression de lecture
window.onscroll = function () {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("bar").style.width = scrolled + "%";
};

// Fonction Confettis (Cœurs) améliorée
function fireSurprise() {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: "❤️", scalar });

  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 30,
    shapes: [heart],
    scalar,
  };

  function shoot() {
    confetti({ ...defaults, particleCount: 15, origin: { x: 0.5, y: 0.7 } });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
// Barre de progression de lecture
window.onscroll = function () {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("bar").style.width = scrolled + "%";
};

// Fonction Confettis (Cœurs) améliorée
function fireSurprise() {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: "❤️", scalar });

  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 30,
    shapes: [heart],
    scalar,
  };

  function shoot() {
    confetti({ ...defaults, particleCount: 15, origin: { x: 0.5, y: 0.7 } });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
} // Barre de progression
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const bar = document.getElementById("bar");
  if (bar) bar.style.width = scrolled + "%";
});

// Retour en haut
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Confettis de coeurs (doit être lié au bouton Instagram/LinkedIn)
function fireSurprise() {
  const scalar = 2.5;
  const heart = confetti.shapeFromText({ text: "❤️", scalar });

  confetti({
    shapes: [heart],
    particleCount: 20,
    spread: 70,
    origin: { y: 0.8 },
    scalar,
  });
}
window.addEventListener("scroll", () => {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;

  const bar = document.getElementById("bar");
  if (bar) {
    bar.style.width = scrolled + "%";
    // Si elle arrive à la fin, la barre devient dorée
    if (scrolled > 98) {
      bar.style.background = "#d4af37";
      bar.style.boxShadow = "0 0 15px #d4af37";
    } else {
      bar.style.background = "var(--accent)";
      bar.style.boxShadow = "0 0 10px var(--accent)";
    }
  }
});

// Gestion du scroll pour le header
window.addEventListener("scroll", () => {
  const header = document.getElementById("navbar");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Ton ancienne fonction de langue doit rester telle quelle
function toggleLanguage() {
  // ... le code précédent ...
}

function startCredits() {
  const screen = document.getElementById("credits-screen");
  const content = document.getElementById("credits-text");

  screen.style.display = "block";
  setTimeout(() => {
    screen.style.opacity = "1";
    // Lancer l'animation du texte
    content.style.animation = "scrollCredits 25s linear forwards";
  }, 100);
}

function closeCredits() {
  const screen = document.getElementById("credits-screen");
  const content = document.getElementById("credits-text");

  screen.style.opacity = "0";
  setTimeout(() => {
    screen.style.display = "none";
    content.style.animation = "none"; // Reset animation
  }, 1000);
}
function startCredits() {
  const screen = document.getElementById("credits-screen");
  const content = document.getElementById("credits-text");

  screen.style.display = "block";
  setTimeout(() => {
    screen.style.opacity = "1";
    content.style.animation = "scrollCredits 40s linear forwards";
  }, 100);
}

function closeCredits() {
  const screen = document.getElementById("credits-screen");
  const content = document.getElementById("credits-text");

  screen.style.opacity = "0";
  setTimeout(() => {
    screen.style.display = "none";
    content.style.animation = "none";
  }, 1000);
}
