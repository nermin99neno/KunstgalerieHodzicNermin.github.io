function openLightbox(imgElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightbox.style.display = "block";
    lightboxImg.src = imgElement.src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}