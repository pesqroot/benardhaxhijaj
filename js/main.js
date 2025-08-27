document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".main-header");

  if (header) {
    // Initial check for scroll position
    if (window.scrollY === 0) {
      header.classList.remove("scrolled");
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Carousel functionality
  const carousel = document.querySelector(".carousel-slides");

  if (carousel) {
    const slides = Array.from(carousel.children);
    const nextButton = document.querySelector(".carousel-btn.next");
    const prevButton = document.querySelector(".carousel-btn.prev");
    const dotsNav = document.querySelector(".carousel-dots");

    let currentIndex = 0;

    // Show only first slide initially
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * index}%)`;
      if (index === 0) {
        slide.classList.add("current");
      }
    });

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("carousel-dot");
      if (index === 0) dot.classList.add("active");
      dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    // Update navigation visibility
    function updateNavigation() {
      prevButton.style.display = currentIndex === 0 ? "none" : "flex";
      nextButton.style.display =
        currentIndex === slides.length - 1 ? "none" : "flex";
    }

    // Move to slide
    function moveToSlide(targetIndex) {
      if (targetIndex < 0 || targetIndex >= slides.length) return;

      const currentSlide = slides[currentIndex];
      const targetSlide = slides[targetIndex];
      const currentDot = dots[currentIndex];
      const targetDot = dots[targetIndex];

      // Move slides
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - targetIndex)}%)`;
      });

      // Update classes
      currentSlide.classList.remove("current");
      targetSlide.classList.add("current");
      currentDot.classList.remove("active");
      targetDot.classList.add("active");

      // Update current index
      currentIndex = targetIndex;

      // Update navigation visibility
      updateNavigation();
    }

    // Next button click
    nextButton.addEventListener("click", () => {
      moveToSlide(currentIndex + 1);
    });

    // Previous button click
    prevButton.addEventListener("click", () => {
      moveToSlide(currentIndex - 1);
    });

    // Dot navigation
    dotsNav.addEventListener("click", (e) => {
      const targetDot = e.target.closest(".carousel-dot");
      if (!targetDot) return;

      const targetIndex = dots.findIndex((dot) => dot === targetDot);
      moveToSlide(targetIndex);
    });

    // Initialize navigation visibility
    updateNavigation();
  }
});
