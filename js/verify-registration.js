// ==========================================
// Heritage Run 4 Registration Verification
// ==========================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbxm_JENehg6TDahfYcgo_8D2YHwJp6Is_-6TbjsJMX-Yo25DrZB_2IwzPyuPFfKQab2/exec";

const form =
    document.getElementById("verifyForm");

const btn =
    document.getElementById("verifyBtn");

const resultContainer =
    document.getElementById("resultContainer");


// ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener("submit", verifyRegistration);


async function verifyRegistration(e) {

    e.preventDefault();


    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim();


    // ==========================================
    // BASIC VALIDATION
    // ==========================================

    if (!firstName || !lastName || !email) {

        resultContainer.innerHTML =
            errorCard(
                "Please enter your First Name, Last Name, and Email Address."
            );

        return;
    }


    // ==========================================
    // BUTTON LOADING STATE
    // ==========================================

    btn.disabled = true;

    btn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> VERIFYING...';


    // Show loading card

    resultContainer.innerHTML =
        loadingCard();


    try {

        // ==========================================
        // SEND REQUEST TO GOOGLE APPS SCRIPT
        // ==========================================

        const url =
            `${API_URL}?firstname=${encodeURIComponent(firstName)}&lastname=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}`;


        const response =
            await fetch(url);


        const data =
            await response.json();


        // ==========================================
        // SUCCESS
        // ==========================================

        if (data.success) {

            resultContainer.innerHTML =
                successCards(data.results);


            resultContainer.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }


        // ==========================================
        // NO MATCH
        // ==========================================

        else {

            resultContainer.innerHTML =
                errorCard(data.message);


            resultContainer.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    }


    catch (error) {

        console.error(
            "Registration verification error:",
            error
        );


        resultContainer.innerHTML =
            errorCard(
                "Unable to connect to the registration server. Please try again later."
            );

    }


    // ==========================================
    // RESTORE BUTTON
    // ==========================================

    btn.disabled = false;

    btn.innerHTML =
        "VERIFY REGISTRATION";

}


// ==========================================
// LOADING CARD
// ==========================================

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


// ==========================================
// SUCCESS CARDS
// ==========================================

function successCards(results) {

    if (!results || results.length === 0) {

        return errorCard(
            "No registration records were found."
        );

    }


    let cardsHTML = `

        <div class="verification-results">

            <div class="results-heading">

                <p class="section-label">

                    REGISTRATION FOUND

                </p>

                <h2 class="section-title">

                    Registration Verified

                </h2>

                <p class="section-description">

                    We found ${results.length}
                    exact registration${results.length > 1 ? "s" : ""} matching
                    the information you entered.

                </p>

            </div>

    `;


    // ==========================================
    // CREATE ONE CARD FOR EACH MATCH
    // ==========================================

    results.forEach((participant, index) => {

        const statusClass =
            participant.registrationStatus === "CONFIRMED"

                ? "status-confirmed"

                : "status-pending";


        cardsHTML += `

            <div class="result-card">

                <div class="result-card-number">

                    ${String(index + 1).padStart(2, "0")}

                </div>


                <h3 class="result-title">

                    ${participant.firstName}
                    ${participant.lastName}

                </h3>


                <div class="result-item">

                    <div class="result-label">

                        Distance

                    </div>

                    <div class="result-value">

                        ${participant.distance}

                    </div>

                </div>


                <div class="result-item">

                    <div class="result-label">

                        Category

                    </div>

                    <div class="result-value">

                        ${participant.category}

                    </div>

                </div>


                <div class="result-item">

                    <div class="result-label">

                        Registration Status

                    </div>

                    <div class="result-value ${statusClass}">

                        ${participant.registrationStatus}

                    </div>

                </div>

            </div>

        `;

    });


    // ==========================================
    // FOOTER / DISCLAIMER
    // ==========================================

    cardsHTML += `

            <div class="verification-note">

                If you notice any discrepancies with the
                information displayed above, please contact us.

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


    return cardsHTML;

}


// ==========================================
// ERROR CARD
// ==========================================

function errorCard(message) {

    return `

        <div class="result-card">

            <h2 class="result-title">

                Unable to Verify Registration

            </h2>

            <p class="result-note">

                ${message}

                <br><br>

                Please verify that your First Name,
                Last Name, and Email Address match
                the information used during registration.

                <br><br>

                If you still believe this is an error,
                please contact us.

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


// ==========================================
// RESET SEARCH
// ==========================================

function resetSearch() {

    document
        .getElementById("verifyForm")
        .reset();


    resultContainer.innerHTML = "";


    document
        .getElementById("firstName")
        .focus();


    window.scrollTo({

        top:
            document
                .querySelector(".verify-registration")
                .offsetTop - 80,

        behavior: "smooth"

    });

}