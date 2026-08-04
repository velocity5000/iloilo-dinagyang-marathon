/*====================================
  LOAD REUSABLE LAYOUT
====================================*/

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