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

    const floatingDays = document.getElementById("floating-days");
    const floatingHours = document.getElementById("floating-hours");
    const floatingMinutes = document.getElementById("floating-minutes");
    const floatingSeconds = document.getElementById("floating-seconds");

    if (floatingDays) {

        floatingDays.textContent = days;
        floatingHours.textContent = hours;
        floatingMinutes.textContent = minutes;
        floatingSeconds.textContent = seconds;

    }

}

updateCountdown();

setInterval(updateCountdown, 1000);

lucide.createIcons();

// ==========================
// RACE DAY COUNTDOWN BANNER
// ==========================

const raceDate = new Date("2027-01-17T00:00:00+08:00").getTime();

const bannerDays = document.getElementById("banner-days");
const bannerHours = document.getElementById("banner-hours");
const bannerMinutes = document.getElementById("banner-minutes");
const bannerSeconds = document.getElementById("banner-seconds");

function updateRaceCountdown() {

    if (!bannerDays) return;

    const now = new Date().getTime();

    const difference = raceDate - now;

    if (difference <= 0) {

        bannerDays.textContent = "000";
        bannerHours.textContent = "00";
        bannerMinutes.textContent = "00";
        bannerSeconds.textContent = "00";

        document.querySelector(".countdown-banner h2").textContent =
            "The Race Has Begun!";

        return;

    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60)) /
        1000
    );

    bannerDays.textContent = String(days).padStart(3, "0");
    bannerHours.textContent = String(hours).padStart(2, "0");
    bannerMinutes.textContent = String(minutes).padStart(2, "0");
    bannerSeconds.textContent = String(seconds).padStart(2, "0");

}

updateRaceCountdown();

setInterval(updateRaceCountdown, 1000);

/* ==========================
   FLOATING COUNTDOWN
========================== */

const floatingBar = document.getElementById("floatingCountdown");

if (floatingBar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > window.innerHeight * 0.75) {

            floatingBar.classList.add("show");

        } else {

            floatingBar.classList.remove("show");

        }

    });

}
