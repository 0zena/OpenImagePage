const accessKey  = ``;
const link = `https://api.unsplash.com/photos/random/?count=30&client_id=${accessKey}`;
const divContainer = document.getElementById("image-container");

async function GetRequest() {
    try {
        const response = await fetch(link);
        const photos = await response.json();
        
        photos.forEach(element => {
            divContainer.innerHTML += `<div><img src="${element.urls.regular}" alt="API"> <span>${element.alt_description}</span></div>`;
        });
    }
    catch (error) {
        alert("Can not load photos");
    }
}

GetRequest();