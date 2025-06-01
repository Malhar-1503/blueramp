document.addEventListener("DOMContentLoaded", function () {
    fetch('js/pics.json')
        .then(res => res.json())
        .then(eventData => {
            const galleryContainer = document.getElementById("gallery-container");


            const allImages = [];

            eventData.forEach((event) => {
                const section = document.createElement("section");
                section.id = event.category.toLowerCase().replace(/\s+/g, '');
                section.className = "mb-5";

                section.innerHTML = `
                    <h3 class="gallery-title mb-4 animate-fade-in">${event.category}</h3>
                    <div class="row g-3">
                        ${event.images.map((img) => {
                    const globalIndex = allImages.length;
                    allImages.push({ ...img, globalIndex });

                    return `
                                <div class="col-6 col-md-4 col-lg-3">
                                    <img src="${img.src}" alt="${img.alt}" 
                                    loading="lazy" 
                                    class="img-fluid rounded gallery-image"
                                    data-image-index="${globalIndex}" 
                                    data-bs-toggle="modal" data-bs-target="#imageModal">
                                </div>`;
                }).join('')}
                    </div>`;

                galleryContainer.appendChild(section);
            });

            // Smooth fade-in when images load
            document.querySelectorAll('.gallery-image').forEach(img => {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            });

            // Scroll to hash AFTER rendering
            requestAnimationFrame(() => {
                const hash = window.location.hash;
                if (hash) {
                    const target = document.querySelector(hash);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });

            // Modal Gallery Setup
            document.querySelectorAll('.gallery-image').forEach(img => {
                img.addEventListener('click', () => {
                    const imageIndex = +img.dataset.imageIndex;
                    const carouselInner = document.getElementById("carousel-inner");

                    carouselInner.innerHTML = allImages.map((image, i) => `
                        <div class="carousel-item ${i === imageIndex ? 'active' : ''}">
                            <img src="${image.src}" class="modal-image" alt="${image.alt}">
                        </div>`).join('');
                });
            });
        })
        .catch(err => console.error('Error loading pics.json:', err));
});
