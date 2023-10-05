function displayPopup(event) {
    const clickElement = event.target;
    const divElement = clickElement.closest('#img-div');
    const buttonClicked = document.getElementsByClassName("close-div");
    
    divElement.id = "popup-div";
    
    divElement.innerHTML += `<button id="close-div"></button>`;
    
    
    buttonClicked.addEventListener('click', () => {
        divElement.id = "img-div";
    });
}

divContainer.addEventListener('click', displayPopup);
