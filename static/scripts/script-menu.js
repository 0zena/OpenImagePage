const menuTap = document.getElementById("corner-menu-button");
const cornerMenu = document.getElementById("corner-menu");

menuTap.addEventListener("click", () => {
    let menu = document.getElementById("corner-popup-menu");
    if (menu == null) {
        cornerMenu.innerHTML += `
        <aside id="corner-popup-menu">
            <a href=""><p>About OpenImg</p></a>
            <a href=""><p>See terms & privacy</p></a>
            <a href=""><p>Contact us</p></a>
        </aside>`;
    } else { cornerMenu.removeChild(menu); }
});
