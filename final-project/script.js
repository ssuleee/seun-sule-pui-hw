document.addEventListener("DOMContentLoaded", () => {
  const getCurrentPage = () => {
    // Get current page number from URL
    const path = window.location.pathname;
    if (path.includes("texture.html")) return 1;
    if (path.includes("journey.html")) return 2;
    if (
      path.includes("high_porosity.html") ||
      path.includes("low_porosity.html")
    )
      return 3;
    return 1;
  };

  const disableFutureSteps = () => {
    const currentPage = getCurrentPage();
    const progressSteps = document.querySelectorAll(".progress-step");

    progressSteps.forEach((step) => {
      const stepNumber = parseInt(step.textContent);

      if (stepNumber > currentPage) {
        // Disable only future steps
        step.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        });
        step.style.cursor = "not-allowed";
      } else {
        // Allow clicking on current and previous steps
        step.style.cursor = "pointer";
      }
    });
  };

  disableFutureSteps();

  // Handle texture selection
  const textureLinks = document.querySelectorAll(".textures a");
  textureLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const hairType = link.getAttribute("data-hair-type");
      localStorage.setItem("selectedHairType", hairType);
    });
  });

  // Update recommendation image based on selected hair type
  if (document.querySelector(".recommendations-container")) {
    const hairType = localStorage.getItem("selectedHairType") || "4a";
    const recommendationImage = document.querySelector(
      ".recommendation-image img"
    );
    if (recommendationImage) {
      recommendationImage.src = `${hairType} hair.jpeg`;
      recommendationImage.alt = `${hairType} hair examples`;
    }
  }
});
