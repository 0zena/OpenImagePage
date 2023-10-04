const token  = config.accessKey;
const link1 = `https://api.unsplash.com/photos/random/?count=30&client_id=${token}`;
const divContainer = document.getElementById("image-container");
const searchBar = document.querySelector('#search-bar');

async function GetRequest(link) {
    try {
        const response = await fetch(link);
        const photos = await response.json();
        
        if (Array.isArray(photos)) {
            divContainer.innerHTML = "";
            
            photos.forEach(element => {
                divContainer.innerHTML +=
                `<div id="img-div">
                <img src="${element.urls.regular}" loading="lazy" id="img-box"> 
                <span id="span-box">${element.alt_description}</span> 
                </div>`;
            });
        } else if (photos.results && Array.isArray(photos.results)) {
            divContainer.innerHTML = "";
            
            photos.results.forEach(element => {
                divContainer.innerHTML +=
                    `<div id="img-div">
                    <img src="${element.urls.regular}" loading="lazy" id="img-box" class="img-box"/>
                    <span id="span-box">${element.alt_description}</span> 
                    </div>`;
            });
        }
    }
    catch (error) {
        console.error("Unexpected API response:", data);
        alert("Can not load photos");
    }
}


searchBar.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        if (this.value != "") { 
            const link2 = `https://api.unsplash.com/search/photos?client_id=${token}&query=${this.value}&per_page=30`;
            GetRequest(link2);
        }
        this.value = ""
    }
});

GetRequest(link1)