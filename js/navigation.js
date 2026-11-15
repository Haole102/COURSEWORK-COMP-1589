const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
// Must match the @media (max-width: 768px) breakpoint in style.css
const mobileLayout = window.matchMedia("(max-width: 768px)");

// Keep aria-expanded and aria-label in sync so screen readers announce the state
const setMenuOpen = (isOpen) => {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
  primaryNavigation.classList.toggle("is-open", isOpen);
};

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

// Escape closes the menu and returns focus to the toggle (keyboard access)
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

// Reset the menu when the window crosses the breakpoint
mobileLayout.addEventListener("change", () => {
  if (
    mobileLayout.matches &&
    primaryNavigation.contains(document.activeElement)
  ) {
    menuToggle.focus();
  }
  setMenuOpen(false);
});
