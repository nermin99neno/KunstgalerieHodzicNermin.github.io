function openLightbox(imgElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightbox.style.display = "block";
    lightboxImg.src = imgElement.src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}
(() => {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".slide"));
  let index = 0;

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function render() {
    slides.forEach(s => s.className = "slide");

    const prev = mod(index - 1, slides.length);
    const next = mod(index + 1, slides.length);
    const prev2 = mod(index - 2, slides.length);
    const next2 = mod(index + 2, slides.length);

    slides[index].classList.add("active");
    slides[prev].classList.add("prev");
    slides[next].classList.add("next");
    slides[prev2].classList.add("prev2");
    slides[next2].classList.add("next2");
  }

  function go(delta) {
    index = mod(index + delta, slides.length);
    render();
  }

  document.querySelector(".nav.prev")?.addEventListener("click", () => go(-1));
  document.querySelector(".nav.next")?.addEventListener("click", () => go(1));

  // Klick auf Side Bild macht es aktiv
  slides.forEach((slide, i) => {
    slide.addEventListener("click", () => {
      index = i;
      render();
    });
  });

  // Keyboard
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });

  // Swipe (mobil)
  let startX = 0;
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
  });

  render();
})();
