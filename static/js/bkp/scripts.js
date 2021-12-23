window.addEventListener("DOMContentLoaded", (event) => {
  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});


window.addEventListener("resize", (event) => {
  var ps = document.getElementById("publicity-section");
  var pf = document.getElementById("publicity-fixed");

  if (window.innerWidth < 767.98) {
    ps.classList.add("fixed-bottom");
    pf.classList.remove("position-fixed");
  } else {
    ps.classList.remove("fixed-bottom");
    pf.classList.add("position-fixed");
  }
});
