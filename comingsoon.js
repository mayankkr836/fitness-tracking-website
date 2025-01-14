// script.js

const countdown = document.getElementById("countdown");

function updateCountdown() {
    const launchDate = new Date("2025-05-01T00:00:00"); // Set your launch date here
    const currentDate = new Date();
    const remainingTime = launchDate - currentDate;

    if (remainingTime <= 0) {
        countdown.innerHTML = "We’re live!";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const countdownInterval = setInterval(updateCountdown, 1000);
