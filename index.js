document.addEventListener("DOMContentLoaded", function(event) {
    // Click hamburger event
    document.getElementById("mobile-menu").addEventListener("click", () => toggleNav());
    function toggleNav() {
        const domElement = document.getElementById("desktop-menu");
        (domElement.firstElementChild.classList[0] == "transform-show") ? domElement.firstElementChild.className = "transform-hide" : domElement.firstElementChild.className = "transform-show";
    }

    // Show Arrow on intersection
    const smallArrow = document.querySelector("#small-arrow");
    const hero = document.querySelector("#hero");
    const heroOptions = {
        rootMargin: "-400px 0px 0px 0px"
    };
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((element) => {
            if (!element.isIntersecting) {
                smallArrow.classList.add("full-opacity");
            } else {
                smallArrow.classList.remove("full-opacity");
            }
        });
    }, heroOptions);
    heroObserver.observe(hero);

    // Change arrow color on a dark color class
    const darkColorElements = document.querySelector(".dark-color");
    const darkColorOptions = {
        rootMargin: "200px 0px 0px 0px"
    };
    const darkColorObserver = new IntersectionObserver((entries) => {
        entries.forEach((element) => {
            if (element.isIntersecting) {
                smallArrow.children[0].classList.remove("darker-color");
                smallArrow.children[0].classList.add("white-color");
            } else {
                
                smallArrow.children[0].classList.add("darker-color");
                smallArrow.children[0].classList.remove("white-color");
            }
        });
    }, darkColorOptions); 
    darkColorObserver.observe(darkColorElements);

    // Add to Navbar a class when in section XYZ
    const navbarSections = document.querySelectorAll("section.on-navbar");
    const sectionOptions = {
        rootMargin: '0px',
        threshold: [0.6, 1]
    }
    
    const navbarObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.intersectionRatio > 0.9 || (entry.target.id === "about" && entry.intersectionRatio > 0.6)) {
                    // Problem between our-clients and about section that would overlap, so 
                    // only add class when our-client is totally visible
                    document.querySelector("#navbar-" + entry.target.id).classList.add("on-section");
                } else {
                    document.querySelector("#navbar-" + entry.target.id).classList.remove("on-section");
                }
            } else {
                document.querySelector("#navbar-" + entry.target.id).classList.remove("on-section");
            }
        });
    }, sectionOptions);

    navbarSections.forEach((section) => {
        navbarObserver.observe(section);
    })
});