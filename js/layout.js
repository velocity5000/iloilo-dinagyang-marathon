/*====================================*
 * LOAD REUSABLE LAYOUT
 *====================================*/

async function loadComponent(id, file) {

    const response = await fetch(file);

    const html = await response.text();

    document.getElementById(id).innerHTML = html;

}

async function initLayout() {

    await loadComponent("header-placeholder", "components/header.html");

    await loadComponent("footer-placeholder", "components/footer.html");

    await loadComponent("floating-placeholder", "components/floating-countdown.html");

    // Load the site's JavaScript
    const script = document.createElement("script");

    script.src = "js/script.js";

    script.onload = () => {

        // Initialize Lucide icons after everything is loaded
        if (window.lucide) {
            lucide.createIcons();
        }

    };

    document.body.appendChild(script);

}

initLayout();


/*====================================*
 * GOOGLE ANALYTICS 4
 *====================================*/

function loadGoogleAnalytics() {

    // Prevent Analytics from being loaded more than once
    if (window.googleAnalyticsLoaded) {
        return;
    }

    window.googleAnalyticsLoaded = true;

    // Google Analytics script
    const analyticsScript = document.createElement("script");

    analyticsScript.async = true;

    analyticsScript.src =
        "https://www.googletagmanager.com/gtag/js?id=G-QZVT56SZ94";

    document.head.appendChild(analyticsScript);


    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    window.gtag = gtag;


    gtag("js", new Date());

    gtag("config", "G-QZVT56SZ94");

}


/*====================================*
 * PRIVACY / COOKIE NOTICE
 *====================================*/

document.addEventListener("DOMContentLoaded", function () {

    // Check if visitor has already accepted
    if (localStorage.getItem("privacyAccepted") === "true") {

        // Visitor already accepted privacy notice
        loadGoogleAnalytics();

        return;
    }


    // Create privacy banner
    const banner = document.createElement("div");

    banner.className = "privacy-cookie-banner";

    banner.innerHTML = `

        <div class="privacy-cookie-content">

            <p>
                We use cookies and similar technologies to improve your
                experience and understand how visitors use our website.
                <a href="privacy-policy.html">
                    Read our Privacy Policy
                </a>
            </p>

            <button id="privacyAcceptBtn">
                Accept
            </button>

        </div>

    `;

    document.body.appendChild(banner);


    // Accept button
    const acceptButton =
        document.getElementById("privacyAcceptBtn");


    acceptButton.addEventListener("click", function () {

        // Save visitor's choice
        localStorage.setItem("privacyAccepted", "true");

        // Start Google Analytics
        loadGoogleAnalytics();

        // Hide privacy banner
        banner.classList.add("privacy-cookie-hide");


        setTimeout(function () {

            banner.remove();

        }, 400);

    });

});


/*====================================*
 * HIDE FLOATING COUNTDOWN WHEN FOOTER
 * IS VISIBLE
 *====================================*/

document.addEventListener("DOMContentLoaded", () => {

    const floatingCountdown =
        document.querySelector(".floating-countdown");

    const footer =
        document.querySelector(".footer");


    if (!floatingCountdown || !footer) return;


    const footerObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        // Footer is visible
                        floatingCountdown.classList.add(
                            "countdown-hidden"
                        );

                    } else {

                        // Footer is no longer visible
                        floatingCountdown.classList.remove(
                            "countdown-hidden"
                        );

                    }

                });

            },

            {
                threshold: 0.05
            }

        );


    footerObserver.observe(footer);

});