/*====================================*
 * LOAD REUSABLE LAYOUT
 *====================================*/

async function loadComponent(id, file) {

    const element =
        document.getElementById(id);


    // If this page does not contain
    // the requested placeholder,
    // simply skip it.

    if (!element) {

        return;

    }


    const response =
        await fetch(file);


    if (!response.ok) {

        throw new Error(
            `Unable to load component: ${file}`
        );

    }


    const html =
        await response.text();


    element.innerHTML =
        html;

}


async function initLayout() {

    // ==========================
    // HEADER
    // ==========================

    await loadComponent(
        "header-placeholder",
        "components/header.html"
    );


    // ==========================
    // FOOTER
    // ==========================

    await loadComponent(
        "footer-placeholder",
        "components/footer.html"
    );


    // ==========================
    // FLOATING COUNTDOWN
    // ==========================

    /*
        Some pages intentionally do not
        use the floating countdown.

        loadComponent() will simply skip
        it when the placeholder doesn't
        exist.
    */

    await loadComponent(
        "floating-placeholder",
        "components/floating-countdown.html"
    );


    // ==========================
    // LOAD SITE JAVASCRIPT
    // ==========================

    const script =
        document.createElement("script");


    script.src =
        "js/script.js";


    script.onload = () => {

        // Initialize Lucide icons
        // after everything is loaded

        if (
            window.lucide &&
            typeof lucide.createIcons ===
                "function"
        ) {

            lucide.createIcons();

        }

    };


    script.onerror = () => {

        console.error(
            "Unable to load js/script.js"
        );

    };


    document.body.appendChild(
        script
    );

}


initLayout();


/*====================================*
 * GOOGLE ANALYTICS 4
 *====================================*/

function loadGoogleAnalytics() {

    // Prevent Analytics from being
    // loaded more than once

    if (
        window.googleAnalyticsLoaded
    ) {

        return;

    }


    window.googleAnalyticsLoaded =
        true;


    // Google Analytics script

    const analyticsScript =
        document.createElement("script");


    analyticsScript.async =
        true;


    analyticsScript.src =
        "https://www.googletagmanager.com/gtag/js?id=G-QZVT56SZ94";


    document.head.appendChild(
        analyticsScript
    );


    // Initialize Google Analytics

    window.dataLayer =
        window.dataLayer || [];


    function gtag() {

        dataLayer.push(arguments);

    }


    window.gtag =
        gtag;


    gtag(
        "js",
        new Date()
    );


    gtag(
        "config",
        "G-QZVT56SZ94"
    );

}


/*====================================*
 * PRIVACY / COOKIE NOTICE
 *====================================*/

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // Check if visitor has
        // already accepted

        if (
            localStorage.getItem(
                "privacyAccepted"
            ) === "true"
        ) {

            loadGoogleAnalytics();

            return;

        }


        // Create privacy banner

        const banner =
            document.createElement("div");


        banner.className =
            "privacy-cookie-banner";


        banner.innerHTML = `

            <div class="privacy-cookie-content">

                <p>

                    We use cookies and similar
                    technologies to improve your
                    experience and understand how
                    visitors use our website.

                    <a href="privacy-policy.html">

                        Read our Privacy Policy

                    </a>

                </p>


                <button id="privacyAcceptBtn">

                    Accept

                </button>

            </div>

        `;


        document.body.appendChild(
            banner
        );


        // Accept button

        const acceptButton =
            document.getElementById(
                "privacyAcceptBtn"
            );


        acceptButton.addEventListener(
            "click",
            function () {


                // Save visitor's choice

                localStorage.setItem(
                    "privacyAccepted",
                    "true"
                );


                // Start Google Analytics

                loadGoogleAnalytics();


                // Hide privacy banner

                banner.classList.add(
                    "privacy-cookie-hide"
                );


                setTimeout(
                    function () {

                        banner.remove();

                    },
                    400
                );

            }
        );

    }
);


/*====================================*
 * HIDE FLOATING COUNTDOWN WHEN FOOTER
 * IS VISIBLE
 *====================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {


        const floatingCountdown =
            document.querySelector(
                ".floating-countdown"
            );


        const footer =
            document.querySelector(
                ".footer"
            );


        // This page may intentionally
        // not have a floating countdown.

        if (
            !floatingCountdown ||
            !footer
        ) {

            return;

        }


        const footerObserver =
            new IntersectionObserver(

                (entries) => {


                    entries.forEach(
                        (entry) => {


                            if (
                                entry.isIntersecting
                            ) {


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

                        }
                    );

                },


                {
                    threshold: 0.05
                }

            );


        footerObserver.observe(
            footer
        );

    }
);