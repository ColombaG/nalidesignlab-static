const slides = Array.from(document.querySelectorAll(".slide"));
const previousButton = document.querySelector(".slide-prev");
const nextButton = document.querySelector(".slide-next");
const slideshowPanel = document.querySelector(".slideshow-panel");

if (slides.length > 1) {
  let currentSlide = 0;
  let autoplayId;
  let touchStartX = 0;
  let touchEndX = 0;

  const showSlide = (index) => {
    slides.forEach((slide, position) => {
      const isActive = position === index;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
  };

  const goToNextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  const goToPreviousSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  };

  const restartAutoplay = () => {
    clearInterval(autoplayId);
    autoplayId = setInterval(goToNextSlide, 2500);
  };

  previousButton?.addEventListener("click", () => {
    goToPreviousSlide();
    restartAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    goToNextSlide();
    restartAutoplay();
  });

  slideshowPanel?.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  slideshowPanel?.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      const minimumSwipeDistance = 40;

      if (Math.abs(swipeDistance) < minimumSwipeDistance) {
        return;
      }

      if (swipeDistance > 0) {
        goToPreviousSlide();
      } else {
        goToNextSlide();
      }

      restartAutoplay();
    },
    { passive: true }
  );

  restartAutoplay();
}
