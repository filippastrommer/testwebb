function toggleMenu() {
    var navbar = document.getElementById("myNavbar");
    if (navbar.className === "navbar") {
        navbar.className += " responsive";
        document.body.classList.add("fullscreen-menu-open");
    } else {
        navbar.className = "navbar";
        document.body.classList.remove("fullscreen-menu-open");
    }
}