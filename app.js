<!-- CSS to handle mobile layout -->
<style>
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  .slider-wrapper {
    display: flex;
    transition: all 0.3s ease;
    will-change: transform;
  }
  .slide {
    min-width: 300px;
    padding: 10px;
    transition: transform 0.3s ease;
    will-change: transform;
  }
  
  @media (max-width: 768px) {
    /* Adjust scaling and layout for mobile */
    .slide {
      min-width: 200px;
    }
    .slider {
      height: auto;
    }
  }
</style>

<!-- HTML structure -->
<div id="title">Image Title</div>
<div class="slider">
  <div class="slider-wrapper">
    <div class="slide">
      <img src="image1.jpg" alt="Image 1">
    </div>
    <div class="slide">
      <img src="image2.jpg" alt="Image 2">
    </div>
    <!-- Add more slides as needed -->
  </div>
</div>
<h1 data-value="WELCOME">WELCOME</h1>

<!-- JavaScript for touch, resize, and responsiveness -->
<script>
  let target = 0;
  let current = 0;
  let ease = 0.075;

  const slider = document.querySelector(".slider");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const slides = document.querySelectorAll(".slide");

  let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function initializeTitle() {
    const firstImage = slides[0].querySelector("img");
    const firstImageAltText = firstImage.alt;
    document.getElementById("title").textContent = firstImageAltText;
  }

  initializeTitle();

  function updateScaleAndPosition() {
    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const centerPosition = (rect.left + rect.right) / 2;
      const distanceFromCenter = centerPosition - window.innerWidth / 2;

      let scale, offsetX;
      if (distanceFromCenter > 0) {
        scale = Math.min(1.5, 1 + distanceFromCenter / window.innerWidth);
        offsetX = (scale - 1) * 200;
      } else {
        scale = Math.max(0.75, 1 - Math.abs(distanceFromCenter) / window.innerWidth);
        offsetX = 0;
      }

      gsap.set(slide, { scale: scale, x: offsetX });

      if (Math.abs(distanceFromCenter) < 150) {
        const imgAltText = slide.querySelector("img").alt;
        document.getElementById("title").textContent = imgAltText;
      }
    });
  }

  function update() {
    current = lerp(current, target, ease);

    gsap.set(".slider-wrapper", {
      x: -current,
    });

    updateScaleAndPosition();
    requestAnimationFrame(update);
  }

  window.addEventListener("resize", () => {
    maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
  });

  window.addEventListener("wheel", (e) => {
    target += e.deltaY;
    target = Math.max(0, target);
    target = Math.min(maxScroll, target);
  });

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      target += 300;  // Swipe left
    }
    if (touchEndX - touchStartX > 50) {
      target -= 300;  // Swipe right
    }
    target = Math.max(0, target);
    target = Math.min(maxScroll, target);
  }

  update();

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let interval = null;

  document.querySelector("h1").addEventListener("mouseover", (event) => {
    console.log("Mouseover event triggered");
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= event.target.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  });
</script>
