const searchInput = document.querySelector("#project-search-input");
const searchCards = document.querySelectorAll("[data-project-category]");
const emptyMessage = document.querySelector("#project-empty");

// Search hides cards with its own data attribute, so it works together with
// the category filter in projects.js (which uses the `hidden` attribute).
const searchProjects = () => {
  const query = searchInput.value.trim().toLowerCase();

  searchCards.forEach((card) => {
    const matches = card.textContent.toLowerCase().includes(query);
    card.toggleAttribute("data-search-hidden", !matches);
  });

  // Show a message when the search and the active filter leave nothing visible
  const visibleCount = [...searchCards].filter(
    (card) => !card.hidden && !card.hasAttribute("data-search-hidden"),
  ).length;
  emptyMessage.hidden = visibleCount > 0;
};

if (searchInput) {
  searchInput.addEventListener("input", searchProjects);

  // Re-check the empty message when a category filter button is clicked
  document.querySelectorAll("[data-project-filter]").forEach((button) => {
    button.addEventListener("click", searchProjects);
  });
}
