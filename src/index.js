const baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
    addRamen();
});

function loadMenu() {
    fetch(baseUrl + "/ramens")
        .then((res) => res.json())
        .then((ramens) => displayRamen(ramens))
}

function displayRamen(ramens) {
    let menu = document.getElementById("ramen-menu");
    let detailImg = document.querySelector("#ramen-detail img")
    ramens.forEach((ramen) => {
        let menuImg = document.createElement("img")
        menuImg.src = ramen.image
        menu.appendChild(menuImg)

        let name = document.querySelector("#ramen-detail h2")
        let restaurant = document.querySelector("#ramen-detail h3")
        let rating = document.getElementById("rating-display")
        let comment = document.getElementById("comment-display")

        menuImg.addEventListener("click", () => {
            detailImg.src = ramen.image;
            name.textContent = ramen.name;
            restaurant.textContent = ramen.restaurant;
            rating.textContent = ramen.rating;
            comment.textContent = ramen.comment;
        });
    })
}

function addRamen() {
    let form = document.getElementById("new-ramen");
    let newName = document.getElementById("new-name");
    let newRestaurant = document.getElementById("new-restaurant");
    let newImage = document.getElementById("new-image");
    let newRating = document.getElementById("new-rating");
    let newComment = document.getElementById("new-comment");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let newRamen = [{
            "name": newName.value,
            "restaurant": newRestaurant.value,
            "image": newImage.value,
            "rating": newRating.value,
            "comment": newComment.value
        }]
        displayRamen(newRamen);
    });
}