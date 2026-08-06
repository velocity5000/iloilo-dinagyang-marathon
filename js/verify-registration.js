// ==========================================
// Heritage Run 4 Registration Verification
// ==========================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbznnAb6zcRk5UBz3gxLRLc7D6B5u01EkyKwNcfdWA2BKnCv5mnrIKxkfyl_m3ghf0pO_A/exec";

const form = document.getElementById("verifyForm");

const btn = document.getElementById("verifyBtn");

const resultContainer = document.getElementById("resultContainer");

form.addEventListener("submit", verifyRegistration);

async function verifyRegistration(e) {

    e.preventDefault();

    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    btn.disabled = true;

    btn.innerHTML = "VERIFYING...";

    btn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> VERIFYING...';

    try {

        const response = await fetch(

            `${API_URL}?firstname=${encodeURIComponent(firstName)}&lastname=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}`

        );

        const data = await response.json();

        if (data.success) {

            resultContainer.innerHTML = successCard(data);

            resultContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        } else {

            resultContainer.innerHTML = errorCard(data.message);

            resultContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }

    catch (error) {

        resultContainer.innerHTML =
            errorCard("Unable to connect to the registration server.");

    }

    btn.disabled = false;

    btn.innerHTML = "VERIFY REGISTRATION";

}

function loadingCard() {

    return `

<div class="result-card">

<div class="loading-spinner"></div>

<h2 class="result-title">

Verifying your registration...

</h2>

<p class="result-note">

This usually takes only a few seconds.

</p>

</div>

`;

}

function successCard(data) {

    const statusClass =
        data.registrationStatus === "CONFIRMED"

            ? "status-confirmed"

            : "status-pending";

    return `

<div class="result-card">

<h2 class="result-title">

Registration Verified

</h2>

<div class="result-item">

<div class="result-label">

Participant

</div>

<div class="result-value">

${data.firstName} ${data.lastName}

</div>

</div>

<div class="result-item">

<div class="result-label">

Distance

</div>

<div class="result-value">

${data.distance}

</div>

</div>

<div class="result-item">

<div class="result-label">

Category

</div>

<div class="result-value">

${data.category}

</div>

</div>

<div class="result-item">

<div class="result-label">

Registration Status

</div>

<div class="result-value ${statusClass}">

${data.registrationStatus}

</div>

</div>

<div class="result-note">

If you notice any discrepancies with the information displayed above, please contact

<br><br>

<a href="mailto:iloilodinagyangmarathon@gmail.com">

iloilodinagyangmarathon@gmail.com

</a>

</div>

<button

class="search-again"

onclick="resetSearch()">

VERIFY ANOTHER REGISTRATION

</button>

</div>

`;

}

function errorCard(message) {

    return `

<div class="result-card">

<h2 class="result-title">

Unable to Verify Registration

</h2>

<p class="result-note">

${message}

<br><br>

Please verify the information entered.

<br><br>

If you still believe this is an error, please contact

<br><br>

<a href="mailto:iloilodinagyangmarathon@gmail.com">

iloilodinagyangmarathon@gmail.com

</a>

</p>

<button

class="search-again"

onclick="resetSearch()">

TRY AGAIN

</button>

</div>

`;

}

function resetSearch() {

    document.getElementById("verifyForm").reset();

    resultContainer.innerHTML = "";

    document.getElementById("firstName").focus();

    window.scrollTo({

        top: document.querySelector(".verify-registration").offsetTop - 80,

        behavior: "smooth"

    });

}