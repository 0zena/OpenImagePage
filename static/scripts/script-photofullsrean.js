function displayPopup(event) {
    const clickElement = event.target;
    const divElement = clickElement.closest('#img-div');
    const imgElement = clickElement.closest('#img-box');

    divElement.style.backgroundColor = "grey";
    divElement.style.height = "50%";
    divElement.style.width = "fit-content"

    divElement.style.display = "flex";
    divElement.style.alignItems = "center";

    divElement.style.position = "absolute";
    divElement.style.zIndex = "2";
    divElement.style.top = "25%";
    divElement.style.left = "25%"

    imgElement.style.height = "100%";
    imgElement.style.width = "auto";
}

divContainer.addEventListener('click', displayPopup);