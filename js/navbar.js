document.addEventListener("DOMContentLoaded", function() {
    // Sabhi navbar links ko select karo
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(event) {
            let href = this.getAttribute("href");

            // Agar link "#" hai to default prevent NAHI karna
            if (href === "#" || href.startsWith("#")) {
                return; // Anchor link scroll hone de
            }

            // Agar href valid link nahi hai, toh preventDefault hatao
            if (!href || href === "") {
                event.preventDefault();
                console.warn("Invalid link: " + href);
            }
        });
    });
});