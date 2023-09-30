const token  = config.accessKey;
const link1 = `https://api.unsplash.com/photos/random/?count=30&client_id=${token}`;
const divContainer = document.getElementById("image-container");

async function GetRequest(link) {
    try {
        const response = await fetch(link);
        const photos = await response.json();
        
        if (Array.isArray(photos)) {
            divContainer.innerHTML = "";
            
            photos.forEach(element => {
                divContainer.innerHTML +=
                `<div class="blurred-image">
                <img src="${element.urls.small}" loading="lazy" id="image-box"> 
                <span>${element.alt_description}</span> 
                </div>`;
            });
        } else if (photos.results && Array.isArray(photos.results)) {
            divContainer.innerHTML = "";
            
            photos.results.forEach(element => {
                divContainer.innerHTML +=
                    `<div class="blurred-image" >
                    <img src="${element.urls.small}" loading="lazy" id="image-box"> 
                    <span>${element.alt_description}</span> 
                    </div>`;
            });
        }
    }
    catch (error) {
        console.error("Unexpected API response:", data);
        alert("Can not load photos");
    }
}

GetRequest(link1);

const searchBar = document.querySelector('#search-bar');

searchBar.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        if (this.value != "") { 
            const link2 = `https://api.unsplash.com/search/photos?client_id=${token}&query=${this.value}&per_page=30`;
            GetRequest(link2);
        }
        this.value = ""
    }
});

