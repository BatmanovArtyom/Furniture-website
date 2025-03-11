// (function() {
//     window.addEventListener('load', () => {
//         const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
//         const footer = document.querySelector('footer');
//
//         if (footer) {
//             const loadInfo = document.createElement('div');
//             loadInfo.innerText = `Page load time is: ${loadTime} мс`;
//             footer.appendChild(loadInfo);
//         }
//     });
// })();

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.navigation a');
    console.log(menuItems);
    const currentPath = document.location.pathname.split("/").pop();
    console.log(currentPath);
    menuItems.forEach((item) => {
        if (item.getAttribute("href") === currentPath) {
            item.classList.add("active");
        }
        else {
            item.classList.remove("active");
        }
    });

})


