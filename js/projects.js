const filterButtons = document.querySelectorAll("[data-project-filter]");
const projectCards = document.querySelectorAll("[data-project-category]");

const filterProjects = (category) => {
  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-project-category");

    if (category === "all" || cardCategory === category) {
      card.hidden = false;
    } else {
      card.hidden = true;
    }
  });

  // aria-pressed tells screen readers which filter is active
  filterButtons.forEach((button) => {
    const isActive = button.getAttribute("data-project-filter") === category;
    button.setAttribute("aria-pressed", String(isActive));
  });
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterProjects(button.getAttribute("data-project-filter"));
  });
});

filterProjects("all");
