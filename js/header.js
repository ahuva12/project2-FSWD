

document.addEventListener("DOMContentLoaded", function () {
    var headerContainer = document.getElementById('header-container');
    console.log(headerContainer);
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
           
            headerContainer.innerHTML = html;
        });
});







