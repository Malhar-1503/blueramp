/* const reviews = [
  { name: "Niladri Kumar", text: "A big shout-out to Blue Ramp and all the young brains and brawn behind this amazing event. Keep your brains intact, stay creative, and continue doing such fantastic work. Wishing you all the best for future events and success.", img: "./assets/artists/1.png" },
  { name: "Javed Ali", text: "I just finished a lovely concert in Pune managed by Blue Ramp. The atmosphere was vibrant, and their hospitality was heartwarming. My best wishes to the entire team. I truly hope we collaborate again for more such memorable concerts together." },
  { name: "Swanand Kirkire", text: "Thank you to Blue Ramp for managing everything so beautifully at Pandit Farms. I’ve performed here before and loved seeing their growth. The arrangements and vibe were dreamy. It’s always a pleasure working with this team. Hope to meet again soon!" },
  { name: "Sarang Sathe", text: "I’m Sarang Sathe. Blue Ramp arranged a show for us at Bougainvillea Farms, Pune. The venue and vibe were amazing—one of our tour’s best. Thanks to Blue Ramp and Ticket Khidakee for a beautifully curated, well-managed, and unforgettable experience." },
  { name: "Rekha Bharadwaj", text: "I’m flying after today’s show! The audience was incredible, and the event was flawlessly organized. Thanks to Blue Ramp and Light Bulb Communications. Everything—from the natural setup to the sold-out crowd—was magical. I look forward to many more shows together." }
]; */
const reviews = [];
fetch("./js/reviews.json")

  .then(response => response.json())
  .then(data => {
    reviews.push(...data.reviews);

    buildDesktopCarousel();
    buildMobileCarousel();


    function createReviewCard(review) {
      return `
    <div class="card m-2 h-100">
      ${review.img ? `<img src="${review.img}" class="card-img-top" alt="${review.name}" style="object-fit: cover;">` : ''}
      <div class="card-body d-flex flex-column justify-content-between">
        <div class="review-text mb-2">${review.text}</div>
        <h6 class="card-subtitle mt-2">– ${review.name}</h6>
      </div>
    </div>
  `;

    }

    function buildDesktopCarousel() {
      const desktopCarousel = document.getElementById("desktopCarouselInner");
      desktopCarousel.innerHTML = "";

      const chunkSize = 3;
      for (let i = 0; i < reviews.length; i += chunkSize) {
        const slideReviews = reviews.slice(i, i + chunkSize);
        const activeClass = i === 0 ? "active" : "";
        const slide = document.createElement("div");
        slide.className = `carousel-item ${activeClass}`;
        slide.innerHTML = `
      <div class="row justify-content-center">
        ${slideReviews.map(review => `<div class="col-md-4">${createReviewCard(review)}</div>`).join("")}
      </div>
    `;
        desktopCarousel.appendChild(slide);
      }
    }

    function buildMobileCarousel() {
      const mobileCarousel = document.getElementById("mobileCarouselInner");
      mobileCarousel.innerHTML = "";

      reviews.forEach((review, idx) => {
        const slide = document.createElement("div");
        slide.className = `carousel-item ${idx === 0 ? "active" : ""}`;
        slide.innerHTML = `
      <div class="d-flex justify-content-center px-3">
        <div class="col-12">${createReviewCard(review)}</div>
      </div>
    `;
        mobileCarousel.appendChild(slide);
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      buildDesktopCarousel();
      buildMobileCarousel();
    });
  })
  .catch(error => console.error("Error loading reviews:", error));