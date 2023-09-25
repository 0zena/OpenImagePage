const MenuTap = document.getElementById("corner-menu-button");
const CornerMenu = document.getElementById("corner-popup-menu");

function ShowMenu() {

    MenuTap.addEventListener("click", (Event) => {
        CornerMenu.style.right = "0px"
        HideMenu();
    });
}

function HideMenu() {
    MenuTap.addEventListener("click", (Event) => {
        CornerMenu.style.right = "-200px"
        ShowMenu();
    });
}

ShowMenu()
