// ==========================
// HERO SLIDER
// ==========================

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

setInterval(() => {

    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");

}, 6000);


// ==========================
// HEADER ON SCROLL
// ==========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// ==========================
// COUNTDOWN
// ==========================

// Philippine Time (GMT+8)
// Early Bird ends:
// August 31, 2026
// 11:59:59 PM

const countdown = document.getElementById("countdown");

const deadline = new Date("2026-08-31T23:59:59+08:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const difference = deadline - now;

    if (difference <= 0) {

        countdown.innerHTML = "Registration Ongoing";

        return;

    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60));

    const minutes = Math.floor((difference % (1000 * 60 * 60))
        / (1000 * 60));

    const seconds = Math.floor((difference % (1000 * 60))
        / 1000);

    countdown.innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

}

updateCountdown();

setInterval(updateCountdown, 1000);

lucide.createIcons();

lucide.createIcons();