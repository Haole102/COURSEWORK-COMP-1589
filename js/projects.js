const filterButtons = document.querySelectorAll("[data-project-filter]");
const projectCards = document.querySelectorAll("[data-project-category]");

function filterProjects(category) {
  // Show or hide each project card
  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-project-category");

    if (category === "all" || cardCategory === category) {
      card.hidden = false; // show
    } else {
      card.hidden = true; // hide
    }
  });

  // Mark the clicked button as active (aria-pressed tells screen readers)
  filterButtons.forEach((button) => {
    const buttonCategory = button.getAttribute("data-project-filter");

    if (buttonCategory === category) {
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }
  });
}

// When a button is clicked, filter by that button's category
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-project-filter");
    filterProjects(category);
  });
});

// Show all projects when the page first loads
filterProjects("all");
