const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-navigation");

// Keep aria-expanded and aria-label in sync so screen readers announce the state
function setMenu(open) {
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu",
  );
  nav.classList.toggle("is-open", open);
}

// Click the button: flip the state
toggle.addEventListener("click", () =>
  setMenu(!nav.classList.contains("is-open")),
);

// Click a link inside the menu: close it
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

// Escape closes the menu and returns focus to the toggle (keyboard access)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("is-open")) {
    setMenu(false);
    toggle.focus();
  }
});

// Reset the menu when the window crosses the mobile breakpoint (matches style.css)
window
  .matchMedia("(max-width: 768px)")
  .addEventListener("change", () => setMenu(false));
