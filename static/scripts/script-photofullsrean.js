let popupDiv = null;

divContainer.addEventListener('click', (event) => {
    const clickElement = event.target;
    const divElement = clickElement.closest('#img-div');
    if (popupDiv == null) {
        divElement.id = "popup-div";
        divElement.innerHTML += `<button id="close-div" onclick="CloseDiv()">Close</button>`;
        popupDiv = divElement; 
    }
});

function CloseDiv() {
    if (popupDiv) {
        const closeDivButton = popupDiv.querySelector("#close-div");

        if (closeDivButton) {
            closeDivButton.remove();
        }

        popupDiv.id = "img-div";
        popupDiv = null; 
    }
}
