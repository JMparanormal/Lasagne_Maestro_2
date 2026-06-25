// Lasagne Maestro – Palazzo luxury version
// Zmeň číslo na reálne WhatsApp číslo podniku vo formáte bez pluska a medzier.
const WHATSAPP_PHONE = "421900000000";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const reservationForm = document.querySelector("[data-reservation-form]");
const yearEl = document.querySelector("[data-year]");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
});

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

function formatDate(dateValue) {
  if (!dateValue) return "";
  const date = new Date(`${dateValue}T00:00:00`);
  return new Intl.DateTimeFormat("sk-SK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

reservationForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(reservationForm);
  const name = data.get("name") || "Neuvedené";
  const date = formatDate(data.get("date"));
  const time = data.get("time") || "Neuvedené";
  const people = data.get("people") || "Neuvedené";
  const place = data.get("place") || "Bez preferencie";
  const note = data.get("note") || "Bez poznámky";

  const message = [
    "Dobrý deň, rád/rada by som si rezervoval/a stôl v Lasagne Maestro.",
    `Meno: ${name}`,
    `Dátum: ${date}`,
    `Čas: ${time}`,
    `Počet osôb: ${people}`,
    `Preferencia: ${place}`,
    `Poznámka: ${note}`,
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
