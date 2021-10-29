/*!
* Start Bootstrap - Scrolling Nav v5.0.4 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


window.addEventListener('resize', event => {
    var ps = document.getElementById("publicity-section");
    var pf = document.getElementById("publicity-fixed");

    if(window.innerWidth<768){
        ps.classList.add("fixed-bottom");
        pf.classList.remove("position-fixed");
    }else{
        ps.classList.remove("fixed-bottom");
        pf.classList.add("position-fixed");
    }
});


document.getElementById('upload-button').addEventListener('click', function(e){
   e.preventDefault();
   uploadFile();
});


async function uploadFile() {
    var spinner =  document.getElementById("spinner-section");
    spinner.style.display = "block";



    let formData = new FormData();
    formData.append("file", fileupload.files[0]);
    await fetch('http://localhost:5000/', {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
        spinner.style.display = "none";
        document.getElementById("spreadsheetToJsonResult").style.display = "block";

        const myJSON = JSON.stringify(data,null, "\t");
        document.getElementById("spreadsheetToJsonResultTextArea").value = myJSON;
    });

}

function spreadsheetToJsonResultCopyBtn(){
    var copyText = document.getElementById("spreadsheetToJsonResultTextArea");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(copyText.value);
}