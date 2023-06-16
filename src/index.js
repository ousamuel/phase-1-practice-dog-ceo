let dogBreeds = [];
document.addEventListener("DOMContentLoaded", () => {
  loadDogImages();
  loadDogBreeds();
});

function loadDogImages() {
  fetch(`https://dog.ceo/api/breeds/image/random/4`)
    .then((res) => res.json())
    .then((data) => {
      data.message.forEach((dogImg) => addDogImage(dogImg));
    });
}

function addDogImage(dogImgURL) {
  const container = document.getElementById("dog-image-container");
  const img = document.createElement("img");
  img.src = dogImgURL;
  container.append(img);
}

function loadDogBreeds() {
  fetch(`https://dog.ceo/api/breeds/list/all`)
    .then((res) => res.json())
    .then((data) => {
      dogBreeds = Object.keys(data.message);
      addBreed(dogBreeds);
      dropdownListener();
    });
}

function addBreed(dogBreeds) {
  const ul = document.getElementById("dog-breeds");
  ul.innerHTML = '';
  dogBreeds.forEach((breed) => {
    const li = document.createElement("li");
    li.innerText = breed;
    li.addEventListener("click", (e) => {
      e.target.style.color = 'pink';
    })
    ul.append(li);
  });
}

function dropdownListener() {
  const breedDropdown = document.getElementById("breed-dropdown");
  breedDropdown.addEventListener("change", (e) => {
    //e.target.value returns the selected option in the dropdown
    addBreed(dogBreeds.filter(breed => breed.startsWith(e.target.value)))
  })
}